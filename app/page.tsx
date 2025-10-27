import Index from "@/app/_components/page/indexPageClient";

export default function Home() {
  const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";

  return <Index serverUrl={SERVER_URL} />;
}
