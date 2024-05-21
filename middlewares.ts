import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/employers-dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url), 307);
    }
    if (req.nextUrl.pathname.startsWith("/candidates-dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url), 307);
    }
  } else {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url), 301);
    } else if (req.nextUrl.pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/employers-dashboard/:path*",
    "/login",
    "/candidates-dashboard/:path*",
    "/register",
  ],
};
