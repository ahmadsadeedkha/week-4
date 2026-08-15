import { getAllCountries } from "../lib/api";
import CountryExplorer from "@/components/CountryExplorer";

export default async function HomePage() {
  const countries = await getAllCountries();

  return (
    <div>
      <CountryExplorer countries={countries} />
    </div>
  );
}
