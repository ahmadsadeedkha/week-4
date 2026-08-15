import { NextResponse } from "next/server";

export async function GET() {
  const supportEmail = process.env.SUPPORT_EMAIL;

  if (!supportEmail) {
    return NextResponse.json(
      { error: "SUPPORT_EMAIL is not configured on the server." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    supportEmail,
    maxMessageLength: Number(process.env.MAX_MESSAGE_LENGTH ?? 500),
  });
}
