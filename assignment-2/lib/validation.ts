const CCA3_PATTERN = /^[A-Za-z]{3}$/;

export function isValidCca3(code: string): boolean {
  return CCA3_PATTERN.test(code);
}
