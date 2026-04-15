"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type FormValues = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentAge: string;
  curriculum: string;
  subjects: string;
  message: string;
};

const initialValues: FormValues = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  studentName: "",
  studentAge: "",
  curriculum: "",
  subjects: "",
  message: "",
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const requiredLabels: Record<Exclude<keyof FormValues, "message">, string> = {
  parentName: "Parent Name",
  parentEmail: "Parent Email",
  parentPhone: "Parent Phone",
  studentName: "Student Name",
  studentAge: "Student Age",
  curriculum: "Curriculum",
  subjects: "Subjects",
};

const fieldClassName =
  "w-full rounded-[12px] border border-[#d9e1f1] bg-white px-4 py-3 text-[15px] text-[#1c2744] outline-none transition-colors duration-150 focus:border-[#365bb2] focus:ring-2 focus:ring-[#365bb2]/20";

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const createIdempotencyKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function BookAssessmentForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const inFlightRequestRef = useRef(false);

  const missingRequiredFields = useMemo(
    () =>
      (Object.keys(requiredLabels) as Array<Exclude<keyof FormValues, "message">>).filter(
        (field) => !formValues[field].trim()
      ),
    [formValues]
  );

  useEffect(() => {
    router.prefetch("/book-free-assessment/thank-you");
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRequestRef.current || isSubmitting) {
      return;
    }

    if (missingRequiredFields.length > 0) {
      setSubmitState({
        status: "error",
        message: `Please complete: ${missingRequiredFields.map((field) => requiredLabels[field]).join(", ")}`,
      });
      return;
    }

    if (!isValidEmail(formValues.parentEmail.trim())) {
      setSubmitState({ status: "error", message: "Please provide a valid parent email address." });
      return;
    }

    setIsSubmitting(true);
    inFlightRequestRef.current = true;
    setSubmitState({ status: "idle", message: "" });

    try {
      const idempotencyKey = createIdempotencyKey();
      const body = JSON.stringify({
        ...formValues,
        idempotencyKey,
      });

      let dispatched = false;
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        dispatched = navigator.sendBeacon(
          "/api/book-assessment",
          new Blob([body], { type: "application/json" })
        );
      }

      if (!dispatched) {
        void fetch("/api/book-assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Idempotency-Key": idempotencyKey,
          },
          body,
          keepalive: true,
        }).catch(() => {
          // Non-blocking background fallback; server logs handle failures.
        });
      }

      setFormValues(initialValues);
      router.replace("/book-free-assessment/thank-you");
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your request right now. Please try again or call us directly.",
      });
      setIsSubmitting(false);
      inFlightRequestRef.current = false;
    }
  };

  return (
    <form className="space-y-4 p-4 md:p-6" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <fieldset disabled={isSubmitting} className="space-y-4 disabled:opacity-100">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Parent Name</span>
          <input
            className={fieldClassName}
            name="parentName"
            value={formValues.parentName}
            onChange={(event) => setFormValues((current) => ({ ...current, parentName: event.target.value }))}
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Parent Email</span>
          <input
            className={fieldClassName}
            name="parentEmail"
            type="email"
            value={formValues.parentEmail}
            onChange={(event) => setFormValues((current) => ({ ...current, parentEmail: event.target.value }))}
            autoComplete="email"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Parent Phone</span>
          <input
            className={fieldClassName}
            name="parentPhone"
            value={formValues.parentPhone}
            onChange={(event) => setFormValues((current) => ({ ...current, parentPhone: event.target.value }))}
            autoComplete="tel"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Student Name</span>
          <input
            className={fieldClassName}
            name="studentName"
            value={formValues.studentName}
            onChange={(event) => setFormValues((current) => ({ ...current, studentName: event.target.value }))}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Student Age / Year</span>
          <input
            className={fieldClassName}
            name="studentAge"
            value={formValues.studentAge}
            onChange={(event) => setFormValues((current) => ({ ...current, studentAge: event.target.value }))}
            placeholder="Example: Age 11 / Year 6"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Curriculum</span>
          <input
            className={fieldClassName}
            name="curriculum"
            value={formValues.curriculum}
            onChange={(event) => setFormValues((current) => ({ ...current, curriculum: event.target.value }))}
            placeholder="British / IB / American / Other"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Subjects Needed</span>
        <input
          className={fieldClassName}
          name="subjects"
          value={formValues.subjects}
          onChange={(event) => setFormValues((current) => ({ ...current, subjects: event.target.value }))}
          placeholder="Example: Maths, English, Science"
          required
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#365bb2]">Additional Notes (Optional)</span>
        <textarea
          className={`${fieldClassName} min-h-[120px]`}
          name="message"
          value={formValues.message}
          onChange={(event) => setFormValues((current) => ({ ...current, message: event.target.value }))}
        />
      </label>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-3 text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? "Submitting..." : "Submit Assessment Request"}
        </button>

        {submitState.message ? (
          <p
            className={`rounded-[10px] px-3 py-2 text-[14px] ${
              submitState.status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
            aria-live="polite"
          >
            {submitState.message}
          </p>
        ) : null}
      </div>
      </fieldset>
    </form>
  );
}
