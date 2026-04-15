import { after } from "next/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { processBookAssessmentSubmission, validateSubmission } from "../../../lib/server/book-assessment";

const readHeader = (allHeaders: Headers, key: string) => allHeaders.get(key)?.trim() ?? "";
const IDEMPOTENCY_WINDOW_MS = 60 * 1000;
const recentSubmissions = new Map<string, number>();

const getClientIpAddress = (allHeaders: Headers) => {
  const forwardedFor = readHeader(allHeaders, "x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return readHeader(allHeaders, "x-real-ip") || "unknown";
};

const pruneExpiredSubmissions = (now: number) => {
  for (const [key, expiresAt] of recentSubmissions.entries()) {
    if (expiresAt <= now) {
      recentSubmissions.delete(key);
    }
  }
};

const buildFallbackIdempotencyKey = (submission: ReturnType<typeof validateSubmission>) =>
  [
    submission.parentEmail.toLowerCase(),
    submission.parentPhone,
    submission.studentName.toLowerCase(),
    submission.subjects.toLowerCase(),
  ].join("|");

const readBodyIdempotencyKey = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const key = (payload as Record<string, unknown>).idempotencyKey;
  return typeof key === "string" ? key.trim() : "";
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const submission = validateSubmission(payload);
    const headerStore = await headers();
    const now = Date.now();
    const bodyIdempotencyKey = readBodyIdempotencyKey(payload);
    const requestIdempotencyKey =
      readHeader(headerStore, "x-idempotency-key") ||
      readHeader(headerStore, "idempotency-key") ||
      bodyIdempotencyKey ||
      buildFallbackIdempotencyKey(submission);

    pruneExpiredSubmissions(now);

    if (recentSubmissions.has(requestIdempotencyKey)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    recentSubmissions.set(requestIdempotencyKey, now + IDEMPOTENCY_WINDOW_MS);

    const meta = {
      ipAddress: getClientIpAddress(headerStore),
      pageUrl: readHeader(headerStore, "referer") || request.url,
      submittedAtIso: new Date(now).toISOString(),
      userAgent: readHeader(headerStore, "user-agent"),
    };

    // Run non-blocking integrations after response to keep submit UX snappy.
    after(async () => {
      await processBookAssessmentSubmission(submission, meta);
    });

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error("Book assessment submission failed.", error);

    const message = error instanceof Error ? error.message : "Unable to submit form.";
    const isValidationError = /Missing required field|valid email|Invalid request payload|Field is too long/.test(message);
    const isConfigError = /Missing required environment variable:/.test(message);
    const statusCode = isValidationError ? 400 : 500;

    return NextResponse.json(
      {
        ok: false,
        message:
          isValidationError || isConfigError || process.env.NODE_ENV !== "production"
            ? message
            : "We could not submit your request right now. Please try again or call us directly.",
      },
      { status: statusCode }
    );
  }
}
