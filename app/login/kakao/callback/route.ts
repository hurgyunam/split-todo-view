import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  const res = await fetch(`${SERVER_URL}/api/v1/auth/login/kakao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  return NextResponse.json({ status: res.status, res });
}
