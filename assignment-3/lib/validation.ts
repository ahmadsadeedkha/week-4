import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(Number(process.env.MAX_MESSAGE_LENGTH ?? 500), "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
