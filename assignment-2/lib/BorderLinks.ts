export interface BorderLink {
  code: string;
  href: string;
}

export function borderLinks(codes: string[]): BorderLink[] {
  return codes.map((code) => ({
    code,
    href: `/country/${code}`,
  }));
}
