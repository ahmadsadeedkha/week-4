import { ContactForm } from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto mt-2 w-full max-w-lg rounded-2xl border border-gray-200 bg-slate-700 p-6 shadow-xl shadow-gray-200/50 sm:p-8">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Get in touch
        </h2>
      </div>
      <ContactForm />
    </main>
  );
}
