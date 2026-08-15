"use server";
import { z } from "zod";
import { contactSchema } from "@/lib/validation";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "age" | "message", string>
>;

export type ContactActionResult =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: ContactFieldErrors };

export async function submitContactForm(
  _prevState: ContactActionResult,
  formData: FormData,
): Promise<ContactActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const { fieldErrors: rawFieldErrors } = z.flattenError(parsed.error);
    const fieldErrors: ContactFieldErrors = {};
    for (const [field, messages] of Object.entries(rawFieldErrors)) {
      if (messages?.[0]) {
        fieldErrors[field as keyof ContactFieldErrors] = messages[0];
      }
    }
    return {
      status: "error",
      message: "Please fix the errors and try again.",
      errors: fieldErrors,
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
