import LoginPageClient from "@/app/_components/loginPageClient";

export default function Login() {
  // 환경 변수에서 값 가져오기
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

  const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";

  // 카카오 인증 URL
  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${KAKAO_REST_API_KEY}` +
    `&redirect_uri=${KAKAO_REDIRECT_URI}` +
    `&response_type=code`; // 인가 코드를 받기 위해 response_type은 'code'로 고정

  // Node.js의 crypto 모듈을 사용하여 안전한 난수 문자열을 생성하는 예시

  const NAVER_AUTH_URL =
    `https://nid.naver.com/oauth2.0/authorize?` +
    `client_id=${NAVER_CLIENT_ID}` +
    `&redirect_uri=${NAVER_REDIRECT_URI}` +
    `&response_type=code`;

  return (
    <LoginPageClient
      serverUrl={SERVER_URL}
      kakaoAuthUrl={KAKAO_AUTH_URL}
      naverAuthUrl={NAVER_AUTH_URL}
    />
  );
}
