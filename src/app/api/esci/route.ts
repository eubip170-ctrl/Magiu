import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/accedi", request.url));
  response.cookies.set("magiu_auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
