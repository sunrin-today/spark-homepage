import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/meeting-room", "/losts", "/charger"];
const COOKIE_KEY = "firebase_auth_token";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(COOKIE_KEY)?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "1");
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/meeting-room/:path*", "/losts/:path*", "/charger/:path*"],
};