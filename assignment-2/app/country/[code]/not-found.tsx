import Link from "next/link";

export default function CountryNotFound() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
      <h2 className="mb-2 text-xl font-semibold">Country not found</h2>
      <p className="mb-4 text-slate-500">
        We couldn't find a country with that code.
      </p>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to all countries
      </Link>
    </div>
  );
}
