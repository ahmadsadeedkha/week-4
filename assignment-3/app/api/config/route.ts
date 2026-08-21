import { NextResponse } from "next/server";
import { readConfig } from "@/lib/config";

export async function GET() {
  let apiBaseUrl: string;
  try {
    apiBaseUrl = readConfig();
  } catch (err) {
    const message = err instanceof Error ? err.message : "API_BASE_URL missing";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({
    apiBaseUrl,
  });
}
