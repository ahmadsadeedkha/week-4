"use server";

import { contactSchema } from "@/lib/validation";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: ContactFieldErrors;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFieldErrors;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      errors: fieldErrors,
    };
  }

  // Simulated persistence step — swap for a real DB write / email send.
  // Kept intentionally simple since the assignment is about the
  // validate -> success/error flow, not the backend integration.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: "success",
    message: `Thanks ${parsed.data.name}, your message has been sent.`,
  };
}
