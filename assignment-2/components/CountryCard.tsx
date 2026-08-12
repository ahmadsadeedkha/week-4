import Link from "next/link";
import Image from "next/image";
import { Country } from "@/lib/types";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/country/${country.cca3}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-gray-800 shadow-lg ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-white/20"
    >
      <div className="relative h-48 w-full shrink-0">
        <Image
          src={country.flags.svg}
          alt={country.flags.alt ?? `Flag of ${country.name.common}`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-gray-300">{country.name.common}</h2>
        <p className="text-sm text-gray-300">
          <span className="text-gray-500">Region:</span> {country.region}
        </p>
        <p className="text-sm text-gray-300">
          <span className="text-gray-500">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
