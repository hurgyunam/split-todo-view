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

  const json = await res.json();

  // 2. 스프링 응답에서 Set-Cookie 헤더를 확인하고, Next.js 응답에 복사
  const setCookieHeader = res.headers.get("Set-Cookie");
  if (setCookieHeader) {
    // Next.js 응답 쿠키 설정 (Set-Cookie 값을 파싱하여 설정)
    // Set-Cookie 헤더는 여러 개일 수 있으므로 이를 처리해야 합니다.
    const setCookieHeaders = res.headers.getSetCookie(); // Next.js 14+에서 사용 가능
    setCookieHeaders.forEach((cookieString) => {
      // 쿠키 문자열을 파싱하여 Next.js cookies().set()에 적합한 형태로 변환 필요
      // 복잡하므로, 가장 간단하게는 아래와 같이 Response 객체를 직접 구성할 수 있습니다.
    });
  }

  // 2. 리다이렉트 응답 객체 생성
  let redirectUrl;
  if (json.status === "route signup") {
    redirectUrl = new URL("/signup?social=kakao", request.url);
  } else {
    redirectUrl = new URL("/", request.url);
  }

  // 3. 리다이렉트 응답 생성
  const response = NextResponse.redirect(redirectUrl);

  // 4. 🚨 스프링 응답에서 받은 Set-Cookie 헤더를 Next.js 응답에 복사 (핵심 수정)
  // getSetCookie()는 배열을 반환하므로, 모든 쿠키를 하나씩 설정해주어야 합니다.
  const setCookieHeaders = res.headers.getSetCookie();

  // 모든 Set-Cookie 헤더를 Next.js 응답에 추가합니다.
  if (setCookieHeaders.length > 0) {
    setCookieHeaders.forEach((cookieString) => {
      // Response.headers.append을 사용하여 Set-Cookie를 추가해야 합니다.
      // Next.js의 NextResponse는 set/append를 통해 Set-Cookie를 정상적으로 처리합니다.
      response.headers.append("Set-Cookie", cookieString);
    });
  }

  return response;
}
