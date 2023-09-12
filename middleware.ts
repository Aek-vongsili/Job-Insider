import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// import { auth } from "firebase-admin";

// const secret_key: string = process.env.NEXT_PUBLIC_PRIVATE_KEY!
// const alg = 'RS256'
export default async function middleware(req: NextRequest) {
  // const key = await importPKCS8(secret_key, alg)

  const { cookies } = req;
  const jwt = cookies.get("token")?.value;
  console.log("this is token", jwt);
  // const url = req.url
  // if (req.nextUrl.pathname.startsWith('/login')) {
  //     if (jwt) {
  //         try {
  //             await verifyFirebaseJwt(jwt);
  //             return NextResponse.redirect(new URL('/', req.url))
  //         } catch (err) {
  //             return NextResponse.next()
  //         }
  //     }
  // }

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
    }

    // if (req.nextUrl.pathname.startsWith("/employers-dashboard")) {
    //   const claim = firebaseAdmin.auth().verifyIdToken(jwt);
    //   console.log(claim);
    // }

    return NextResponse.next();
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/employers-dashboard/:path*", "/login","/candidates-dashboard/:path*"],
};
