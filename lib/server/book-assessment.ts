import nodemailer from "nodemailer";
import { google } from "googleapis";

export type BookAssessmentSubmission = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentAge: string;
  curriculum: string;
  subjects: string;
  message: string;
};

type SubmissionMeta = {
  ipAddress: string;
  pageUrl: string;
  submittedAtIso: string;
  userAgent: string;
};

const DEFAULT_EXTERNAL_TASK_TIMEOUT_MS = 8000;

const REQUIRED_FIELDS: Array<keyof BookAssessmentSubmission> = [
  "parentName",
  "parentEmail",
  "parentPhone",
  "studentName",
  "studentAge",
  "curriculum",
  "subjects",
];

const MAX_LENGTHS: Record<keyof BookAssessmentSubmission, number> = {
  parentName: 120,
  parentEmail: 120,
  parentPhone: 40,
  studentName: 120,
  studentAge: 20,
  curriculum: 100,
  subjects: 250,
  message: 2000,
};

const readEnv = (key: string) => process.env[key]?.trim() ?? "";
const readPositiveIntEnv = (key: string, fallback: number) => {
  const raw = readEnv(key);
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

const toSingleLine = (value: string) => value.replace(/\s+/g, " ").trim();

const parseString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const ensureRequiredConfig = (key: string) => {
  const value = readEnv(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const normalizePrivateKey = (value: string) => {
  let normalized = value.trim();

  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1);
  }

  if (
    (normalized.startsWith('\\"') && normalized.endsWith('\\"')) ||
    (normalized.startsWith("\\'") && normalized.endsWith("\\'"))
  ) {
    normalized = normalized.slice(2, -2);
  }

  return normalized.replace(/\\n/g, "\n");
};

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

export const validateSubmission = (payload: unknown): BookAssessmentSubmission => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid request payload.");
  }

  const candidate = payload as Record<string, unknown>;

  const submission: BookAssessmentSubmission = {
    parentName: toSingleLine(parseString(candidate.parentName)),
    parentEmail: toSingleLine(parseString(candidate.parentEmail)).toLowerCase(),
    parentPhone: toSingleLine(parseString(candidate.parentPhone)),
    studentName: toSingleLine(parseString(candidate.studentName)),
    studentAge: toSingleLine(parseString(candidate.studentAge)),
    curriculum: toSingleLine(parseString(candidate.curriculum)),
    subjects: toSingleLine(parseString(candidate.subjects)),
    message: parseString(candidate.message).trim(),
  };

  for (const field of REQUIRED_FIELDS) {
    if (!submission[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(submission.parentEmail)) {
    throw new Error("Please provide a valid email address.");
  }

  for (const field of Object.keys(MAX_LENGTHS) as Array<keyof BookAssessmentSubmission>) {
    if (submission[field].length > MAX_LENGTHS[field]) {
      throw new Error(`Field is too long: ${field}`);
    }
  }

  return submission;
};

const appendToGoogleSheet = async (submission: BookAssessmentSubmission, meta: SubmissionMeta) => {
  const serviceAccountEmail = ensureRequiredConfig("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = normalizePrivateKey(ensureRequiredConfig("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"));
  const spreadsheetId = ensureRequiredConfig("GOOGLE_SHEET_ID");
  const sheetName = readEnv("GOOGLE_SHEET_TAB_NAME") || "Submissions";

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          meta.submittedAtIso,
          submission.parentName,
          submission.parentEmail,
          submission.parentPhone,
          submission.studentName,
          submission.studentAge,
          submission.curriculum,
          submission.subjects,
          submission.message,
          meta.pageUrl,
          meta.ipAddress,
          meta.userAgent,
        ],
      ],
    },
  });
};

const sendNotificationEmail = async (submission: BookAssessmentSubmission, meta: SubmissionMeta) => {
  const host = ensureRequiredConfig("SMTP_HOST");
  const port = Number.parseInt(readEnv("SMTP_PORT") || "587", 10);
  const user = ensureRequiredConfig("SMTP_USER");
  const pass = ensureRequiredConfig("SMTP_PASS");
  const fromEmail = ensureRequiredConfig("BOOKING_FROM_EMAIL");
  const toEmail = ensureRequiredConfig("BOOKING_NOTIFICATION_TO_EMAIL");
  const fromName = readEnv("BOOKING_FROM_NAME") || "Improve ME Website";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    replyTo: submission.parentEmail,
    subject: `Book Free Assessment: ${submission.parentName} (${submission.studentName})`,
    text: [
      "New Book Free Assessment Submission",
      "",
      `Parent Name: ${submission.parentName}`,
      `Parent Email: ${submission.parentEmail}`,
      `Parent Phone: ${submission.parentPhone}`,
      `Student Name: ${submission.studentName}`,
      `Student Age: ${submission.studentAge}`,
      `Curriculum: ${submission.curriculum}`,
      `Subjects: ${submission.subjects}`,
      `Message: ${submission.message || "-"}`,
      `Submitted At (UTC): ${meta.submittedAtIso}`,
      `Page URL: ${meta.pageUrl}`,
      `IP Address: ${meta.ipAddress}`,
      `User Agent: ${meta.userAgent || "-"}`,
    ].join("\n"),
  });
};

export const processBookAssessmentSubmission = async (
  submission: BookAssessmentSubmission,
  meta: SubmissionMeta
) => {
  const timeoutMs = readPositiveIntEnv("BOOKING_ASYNC_TIMEOUT_MS", DEFAULT_EXTERNAL_TASK_TIMEOUT_MS);
  const results = await Promise.allSettled([
    withTimeout(appendToGoogleSheet(submission, meta), timeoutMs, "Google Sheets append"),
    withTimeout(sendNotificationEmail(submission, meta), timeoutMs, "Email notification"),
  ]);

  const taskNames = ["googleSheet", "email"] as const;
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Book assessment async task failed: ${taskNames[index]}`, result.reason);
    }
  });
};
