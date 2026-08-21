export function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

// -------------------------------------------------------------

function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface Crumb {
  label: string;
  href: string;
}

export function crumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  return segments.map((segment) => {
    currentPath += `/${segment}`;

    return {
      label: formatSegmentLabel(segment),
      href: currentPath,
    };
  });
}
