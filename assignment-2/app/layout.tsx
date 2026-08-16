import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Country Explorer",
  description: "Explore countries around the world",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black px-4 py-10 flex flex-col items-center">
        <nav className="mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          <Link href="/">Country Explorer</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
