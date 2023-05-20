import { NextResponse } from "next/server";

import type { NextRequest } from 'next/server'
import { verifyFirebaseJwt } from "./services/jwt_verify";

// const secret_key: string = process.env.NEXT_PUBLIC_PRIVATE_KEY!
// const alg = 'RS256'
export default async function middleware(req: NextRequest) {
    // const key = await importPKCS8(secret_key, alg)
    const { cookies } = req
    const jwt = cookies.get('token')?.value
    // const url = req.url
    if (req.nextUrl.pathname.startsWith('/login')) {
        if (jwt) {
            try {
                await verifyFirebaseJwt(jwt);
                return NextResponse.redirect(new URL('/', req.url))
            } catch (err) {
                return NextResponse.next()
            }
        }
    }


    if (req.nextUrl.pathname.startsWith('/employers-dashboard')) {
        if (jwt === undefined || jwt ===null || jwt === "") {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        try {
            const tokenData = await verifyFirebaseJwt(jwt);
            console.log(tokenData);
            return NextResponse.next()
        } catch (err) {
            console.error(`Invalid Token`, err);
            return NextResponse.redirect(new URL('/login', req.url))

        }
    }
    return NextResponse.next()



}
export const config = {
    matcher: ['/employers-dashboard/:path*', '/login'],
}