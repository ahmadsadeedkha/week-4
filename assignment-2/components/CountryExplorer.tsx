"use client";

import { useMemo, useState } from "react";
import { Country } from "@/lib/types";
import CountryCard from "./CountryCard";

interface CountryExplorerProps {
  countries: Country[];
}

export default function CountryExplorer({ countries }: CountryExplorerProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => {
    const set = new Set(countries.map((c) => c.region).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [countries]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return countries.filter((c) => {
      const matchesSearch =
        term === "" || c.name.common.toLowerCase().includes(term);
      const matchesRegion = region === "all" || c.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by country name…"
          className="w-full sm:max-w-sm rounded-lg bg-gray-800 px-4 py-2.5 text-white placeholder:text-gray-500 border border-gray-700 focus:border-gray-500 focus:outline-none transition-colors"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full sm:w-48 rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-white shadow-sm focus:border-gray-500 focus:outline-none transition-colors cursor-pointer"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === "all" ? "All Regions" : r}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500">No countries match your search.</p>
      ) : (
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}
