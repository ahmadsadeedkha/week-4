"use server";

import {
  contactSchema,
  parseForm,
  type ContactFormRawValues,
} from "@/lib/validation";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "age" | "message", string>
>;

export type ContactActionResult =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      errors?: ContactFieldErrors;
      values?: ContactFormRawValues;
    };

export async function submitContactForm(
  _prevState: ContactActionResult,
  formData: FormData,
): Promise<ContactActionResult> {
  const result = parseForm(contactSchema, formData);

  if (!result.ok) {
    return {
      status: "error",
      message: "Please fix the errors and try again.",
      errors: result.errors as ContactFieldErrors,
      values: result.values,
    };
  }

  // Simulated persistence step — swap for a real DB write / email send.
  // Kept intentionally simple since the assignment is about the
  // validate -> success/error flow, not the backend integration.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: "success",
  };
}
