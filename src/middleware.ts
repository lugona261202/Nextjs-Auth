import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// this middle ware does not let an unlogged user visit private page like profile
//middleware part 1 login
export function middleware(request:NextRequest){
    const path = request.nextUrl.pathname
    const isPublicPath = path ==='/login'||path==='/signup'|| path ==='/verifyemail'

    const token = request.cookies.get('token')?.value||''
    // redirecting user if he already has token and is on a public path
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    // redirecting user if he does not have token and is not on a public path
    if(!isPublicPath && !token ){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }


}

// middleware part 2 matching paths
export const config={
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
        ]
} 



