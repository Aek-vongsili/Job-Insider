import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { cookies } = req;
  const jwt = cookies.get("token")?.value;

  if (!jwt) {
    if (req.nextUrl.pathname.startsWith("/employers-dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/candidates-dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (req.nextUrl.pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next(); // This line should only execute if none of the redirection conditions are met.
}
export const config = {
  matcher: [
    "/employers-dashboard/:path*",
    "/login",
    "/candidates-dashboard/:path*",
    "/register",
  ],
};
