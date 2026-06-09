import { NextResponse } from "next/server";

const PIN = process.env.SITE_PIN ?? "1234";

export async function POST(request: Request) {
  let body: { pin?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const pin = (body.pin ?? "").trim();

  if (pin !== PIN) {
    return NextResponse.json(
      { ok: false, error: "PIN errato. Riprova." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("magiu_auth", PIN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 giorni
  });

  return response;
}
