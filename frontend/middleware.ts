import { NextRequest, NextResponse } from "next/server";

const TOKEN_KEY = "lumina_token";

// Rutas que requieren estar autenticado
const PROTECTED_ROUTES = ["/profile"];

// Rutas que solo son accesibles sin sesión (si ya hay token, redirige al home)
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register"],
};
