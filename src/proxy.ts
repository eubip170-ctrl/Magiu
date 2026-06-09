import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** PIN di accesso. In produzione impostalo nella variabile d'ambiente SITE_PIN. */
const PIN = process.env.SITE_PIN ?? "1234";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // La pagina di accesso e le sue API sono sempre raggiungibili.
  if (pathname.startsWith("/accedi") || pathname.startsWith("/api/accedi")) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("magiu_auth")?.value === PIN;

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/accedi";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Esegui il proxy su tutte le pagine tranne file statici e immagini.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
