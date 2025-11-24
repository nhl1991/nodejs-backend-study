"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleOnSubmit = async () => {
    const controller = new AbortController();
    const user = { id: userId, password: password };
    const response = await fetch("/api/login", {
      signal: controller.signal,
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if(response.ok) router.push('/');
    console.log("client : ", await response.json());
  };
  const onCheckAuth = async () => {
    const controller = new AbortController();
    const response = await fetch("/api/test-auth", {
      signal: controller.signal,
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("client : ", await response.json());
  };
  return (
    <>
      <input
        id="userId"
        type="text"
        placeholder="USER ID"
        onChange={(e) => setUserId(e.currentTarget.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="USER ID"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button id="submit" onClick={handleOnSubmit}>
        제출
      </button>
      <button id="submit" onClick={onCheckAuth}>
        CHECK AUTH
      </button>
    </>
  );
}
