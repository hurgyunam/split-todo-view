"use client";

import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginPageClient({
  serverUrl,
  kakaoAuthUrl,
  naverAuthUrl,
}: {
  serverUrl: string;
  kakaoAuthUrl: string;
  naverAuthUrl: string;
}) {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = async () => {
    const res = await fetch(`${serverUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id,
        password,
      }),
    });
  };

  const loginKakao = async () => {
    location.href = kakaoAuthUrl;
  };

  const loginNaver = async () => {
    const res = await fetch(`${serverUrl}/api/v1/auth/login/naver/state`, {
      method: "POST",
      credentials: "include",
    });
    const json = await res.json();
    const state = json.result;
    location.href = naverAuthUrl + `&state=${state}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 bg-white">
      <div className="flex items-center gap-2">
        ID:{" "}
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        PW:{" "}
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={login}>
        LOGIN
      </Button>
      <Button variant="contained" onClick={loginKakao}>
        LOGIN WITH KAKAOTALK
      </Button>
      <Button variant="contained" onClick={loginNaver}>
        LOGIN WITH NAVER
      </Button>
    </div>
  );
}
