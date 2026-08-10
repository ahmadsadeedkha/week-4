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
