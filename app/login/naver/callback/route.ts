import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  const res = await fetch(`${SERVER_URL}/api/v1/auth/login/naver`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(cookie && { Cookie: cookie }), // 쿠키가 있을 경우에만 헤더에 추가
    },
    body: JSON.stringify({
      code,
    }),
  });

  console.log("naver callback", res);

  return NextResponse.json({ status: res.status, res });
}
