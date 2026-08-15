"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ContactFormRawValues } from "@/lib/validation";
import {
  submitContactForm,
  type ContactActionResult,
  type ContactFieldErrors,
} from "@/app/actions";

type ContactFormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      errors?: ContactFieldErrors;
      values?: ContactFormRawValues;
    };

const initialActionState: ContactActionResult = { status: "idle" };

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-blue-800 hover:-translate-y-0.5"
    >
      {pending && (
        <svg
          className="h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
    >
      {message}
    </p>
  );
}

const inputClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200";
const labelClasses = "mb-1.5 block text-sm font-medium text-gray-700";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [actionResult, formAction, isPending] = useActionState(
    submitContactForm,
    initialActionState,
  );
  const state: ContactFormState = isPending
    ? { status: "submitting" }
    : actionResult;
  const fieldErrors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!isPending) {
      setAttempt((n) => n + 1);
    }
  }, [actionResult, isPending]);

  return (
    <div>
      <form
        action={formAction}
        noValidate
        aria-describedby="form-status"
        className="space-y-5"
      >
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            key={`name-${attempt}`}
            id="name"
            name="name"
            type="text"
            placeholder="Ahmad Sadeed Khan"
            defaultValue={values?.name ?? ""}
            aria-invalid={!!fieldErrors?.name}
            className={inputClasses}
          />
          <FieldError message={fieldErrors?.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            key={`email-${attempt}`}
            id="email"
            name="email"
            type="email"
            placeholder="ahmad@example.com"
            defaultValue={values?.email ?? ""}
            aria-invalid={!!fieldErrors?.email}
            className={inputClasses}
          />
          <FieldError message={fieldErrors?.email} />
        </div>

        <div>
          <label htmlFor="age" className={labelClasses}>
            Age
          </label>
          <input
            key={`age-${attempt}`}
            id="age"
            name="age"
            type="number"
            min={18}
            placeholder="18"
            defaultValue={values?.age ?? ""}
            aria-invalid={!!fieldErrors?.age}
            className={inputClasses}
          />
          <FieldError message={fieldErrors?.age} />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            key={`message-${attempt}`}
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us what's on your mind..."
            defaultValue={values?.message ?? ""}
            aria-invalid={!!fieldErrors?.message}
            className={`${inputClasses} resize-none`}
          />
          <FieldError message={fieldErrors?.message} />
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div
            id="form-status"
            role="status"
            aria-live={state.status === "error" ? "assertive" : "polite"}
            aria-atomic="true"
            className="min-h-6"
          >
            {state.status === "success" && (
              <p
                role="status"
                className="flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                Your message has been sent.
              </p>
            )}
            {state.status === "error" && !state.errors && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {state.message}
              </p>
            )}
          </div>
          <SubmitButton pending={state.status === "submitting"} />
        </div>
      </form>
    </div>
  );
}

// DEEPER P4
// isPending is the single source of truth, and it collapses everything else while true.
// state is computed fresh every render as isPending ? { status: "submitting" } : actionResult — so the instant a submission starts, every other status disappears from view.
// There's no window where a stale success or error from a previous submission and an in-flight new one can both be true at once,
// because the union only allows one status at a time and submitting always wins over whatever the last server result was.
