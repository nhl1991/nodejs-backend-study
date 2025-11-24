import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const controller = new AbortController();
  const body = await req.json();
  const user = {
    email: body.id,
    password: body.password,
  };
  const response = await fetch("http://localhost:3001/auth/login3", {
    signal: controller.signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const setCookie = response.headers.get("set-cookie");
  const res = NextResponse.json({ ok: response.ok });
  //   console.log(result);
  if (setCookie) {
    // 브라우저로 그대로 전달
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}
