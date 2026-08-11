import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-5 p-4 bg-black text-white justify-center">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}

// P2
// <Link> uses client-side JavaScript routing with prefetching to swap page components dynamically,
// whereas <a> causes the browser to issue a fresh HTTP document request that reloads the entire page state.

// Deeper P2
// Use a plain <a> tag when linking to external websites, pointing to file downloads (e.g., PDFs),
// or navigating to non-React routes where you explicitly want a complete browser reset.
