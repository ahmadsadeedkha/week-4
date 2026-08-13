import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isValidCca3 } from "@/lib/validation";
import { getCountryByCode, getCountriesByCodes } from "@/lib/api";
import { borderLinks } from "@/lib/BorderLinks";

export default async function CountryDetailPage({
  params,
}: PageProps<"/country/[code]">) {
  const { code } = await params;

  if (!isValidCca3(code)) {
    notFound();
  }

  const country = await getCountryByCode(code.toUpperCase());
  if (!country) {
    notFound();
  }

  //DEEPER - P2
  const borderCodes = country.borders ?? [];
  const borderCountries = await getCountriesByCodes(borderCodes);
  const links = borderLinks(borderCodes);

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-gray-400 hover:text-white"
      >
        ← Back to all countries
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative h-48 w-full shrink-0 sm:w-80">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            fill
            className="rounded-md object-cover"
            unoptimized
          />
        </div>

        <div className="border border-gray-700 rounded-md p-6 bg-gray-800">
          <h1 className="text-3xl font-bold text-gray-300">
            {country.name.common}
          </h1>
          <p className="mb-4 text-white">{country.name.official}</p>

          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-gray-500 font-semibold">Capital</dt>
            <dd className="text-white">
              {country.capital?.join(", ") ?? "N/A"}
            </dd>

            <dt className="text-gray-500 font-semibold">Population</dt>
            <dd className="text-white">
              {country.population.toLocaleString()}
            </dd>

            <dt className="text-gray-500 font-semibold">Region</dt>
            <dd className="text-white">
              {country.region}
              {country.subregion ? ` (${country.subregion})` : ""}
            </dd>

            <dt className="text-gray-500 font-semibold">Languages</dt>
            <dd className="text-white">
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </dd>
          </dl>

          {borderCountries.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-gray-500 font-semibold">
                Border Countries
              </h2>
              <div className="flex flex-wrap gap-2">
                {links.map(({ code, href }) => {
                  const border = borderCountries.find((b) => b.cca3 === code);
                  return (
                    <Link
                      key={code}
                      href={href}
                      className="rounded-md border border-slate-300 bg-white font-bold px-3 py-1 text-sm hover:bg-slate-100"
                    >
                      {border?.name.common ?? code}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
