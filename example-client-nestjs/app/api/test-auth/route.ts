import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const controller = new AbortController();
  const cookie = req.headers.get("cookie") ?? "";
  const response = await fetch("http://localhost:3001/auth/test-guard2", {
    signal: controller.signal,
    method: "GET",
    
    headers: {
      // 이걸 Nest로 보내줘야 Passport가 세션을 인식함!
      cookie,
    },
  });


  if (!response.ok) {
    return NextResponse.json({
      status: response.status,
      message: response.statusText,
    });
  }

  const result = await response.json();
  return NextResponse.json({ ok: true, user: result });
}
