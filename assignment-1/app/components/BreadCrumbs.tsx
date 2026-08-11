"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { crumbs } from "@/app/lib/utils";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const itemList = crumbs(pathname);

  // '/' returns an empty array, so we don't want to render anything for the home page
  if (itemList.length === 0) return null;

  return (
    <nav className="p-2 text-sm italic">
      <Link href="/">Home</Link>
      {itemList.map((crumb) => (
        <span key={crumb.href}>
          {" / "}
          <Link href={crumb.href}>{crumb.label}</Link>
        </span>
      ))}
    </nav>
  );
}
