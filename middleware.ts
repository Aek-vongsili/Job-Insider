import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_URL = "/login";
const HOME_URL = "/";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  switch (true) {
    case !token &&
      (pathname.startsWith("/employers-dashboard") ||
        pathname.startsWith("/candidates-dashboard")):
      return NextResponse.redirect(new URL(LOGIN_URL, req.url), 307);
    case token &&
      (pathname.startsWith("/login") || pathname.startsWith("/register")):
      return NextResponse.redirect(new URL(HOME_URL, req.url), 307);
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/employers-dashboard/:path*",
    "/login",
    "/candidates-dashboard/:path*",
    "/register",
  ],
};
