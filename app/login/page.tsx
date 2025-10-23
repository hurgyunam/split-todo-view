"use client";

import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/auth/login`, {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
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
    </div>
  );
}
