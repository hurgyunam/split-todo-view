"use client";

import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const signup = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id,
        password,
        nickname,
      }),
    });
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
      <div className="flex items-center gap-2">
        NICKNAME:{" "}
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={signup}>
        SIGN UP!
      </Button>
    </div>
  );
}
