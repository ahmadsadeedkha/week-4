"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive } from "../lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5 p-4 bg-black text-white justify-center">
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              active
                ? "font-bold text-blue-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

// P2
// <Link> uses client-side JavaScript routing with prefetching to swap page components dynamically,
// whereas <a> causes the browser to issue a fresh HTTP document request that reloads the entire page state.

// Deeper P2
// Use a plain <a> tag when linking to external websites, pointing to file downloads (e.g., PDFs),
// or navigating to non-React routes where you explicitly want a complete browser reset.
