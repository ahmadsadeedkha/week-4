type Env = Record<string, string | undefined>;

export function readConfig(env: Env = process.env): string {
  const value = env.API_BASE_URL;
  if (!value) {
    throw new Error("API_BASE_URL missing");
  }
  return value;
}
