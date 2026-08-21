import Link from "next/link";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex">
      <aside className="p-4 border-r border-gray-200">
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Overview
          </Link>
          <Link
            href="/dashboard/user-profile"
            className="text-blue-600 hover:underline"
          >
            User Profile
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
