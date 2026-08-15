"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-blue-800 hover:-translate-y-0.5"
    >
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
  const [state, formAction] = useActionState(submitContactForm, initialState);

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
            id="name"
            name="name"
            type="text"
            placeholder="Ahmad Sadeed Khan"
            aria-invalid={!!state.errors?.name}
            className={inputClasses}
          />
          <FieldError message={state.errors?.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ahmad@example.com"
            aria-invalid={!!state.errors?.email}
            className={inputClasses}
          />
          <FieldError message={state.errors?.email} />
        </div>

        <div>
          <label htmlFor="age" className={labelClasses}>
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={18}
            placeholder="18"
            aria-invalid={!!state.errors?.age}
            className={inputClasses}
          />
          <FieldError message={state.errors?.age} />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us what's on your mind..."
            aria-invalid={!!state.errors?.message}
            className={`${inputClasses} resize-none`}
          />
          <FieldError message={state.errors?.message} />
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div id="form-status" className="min-h-6">
            {state.status === "success" && (
              <p
                role="status"
                className="flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                {state.message}
              </p>
            )}
            {state.status === "error" && !state.errors && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {state.message}
              </p>
            )}
          </div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
