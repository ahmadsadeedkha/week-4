import { Country } from "./types";

const BASE_URL = "https://restcountries.conventus.de/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(
    `${BASE_URL}/all?fields=name,capital,population,region,flags,cca3`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch countries: ${res.status}`);
  }

  const data: Country[] = await res.json();
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(
    `${BASE_URL}/alpha/${code}?fields=name,capital,population,region,flags,cca3,languages,borders`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch country ${code}: ${res.status}`);
  }

  const data: Country | Country[] = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (codes.length === 0) return [];

  const res = await fetch(
    `${BASE_URL}/alpha?codes=${codes.join(",")}&fields=name,cca3`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) return [];
  return res.json();
}
