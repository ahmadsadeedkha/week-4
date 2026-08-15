import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  age: z.coerce
    .number()
    .int("Age must be a whole number.")
    .min(18, "You must be at least 18."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(Number(process.env.MAX_MESSAGE_LENGTH ?? 500), "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type FieldErrors<T extends z.ZodTypeAny> = Partial<
  Record<keyof z.infer<T>, string>
>;

export type ParseFormResult<T extends z.ZodTypeAny> =
  | { ok: true; data: z.infer<T> }
  | { ok: false; errors: FieldErrors<T> };

// The boundary between raw browser input and trusted server data.
// FormData values are always strings — coercion (e.g. age -> number)
// happens inside the schema itself (z.coerce.number()), not here, so
// there's one source of truth for both the shape and the conversion.
export function parseForm<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): ParseFormResult<T> {
  const raw = Object.fromEntries(formData);
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const { fieldErrors: rawFieldErrors } = z.flattenError(parsed.error);
    const errors: FieldErrors<T> = {};
    const entries = Object.entries(rawFieldErrors) as [
      string,
      string[] | undefined,
    ][];
    for (const [field, messages] of entries) {
      if (messages?.[0]) {
        errors[field as keyof FieldErrors<T>] = messages[0];
      }
    }
    return { ok: false, errors };
  }

  return { ok: true, data: parsed.data };
}
