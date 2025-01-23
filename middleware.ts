import NextAuth from "next-auth";
import { NextResponse } from 'next/server'

//import type { NextRequest } from 'next/server';
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";
/* import { Role } from "@prisma/client"; */

const { auth } = NextAuth(authConfig);
/**
 * Middleware function for authentication and authorization.
 * @param req - The request object.
 * @returns The middleware function that handles authentication and authorization logic.
 */
export default auth(async (req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);


    if (isApiAuthRoute) {
        return /* null */;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return /* null */;
    }


    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Find a matching path with dynamic path handling
/*     const matchingRoleRoute = roleRoutesPermissions.find((p) => {
        if (p.path.includes("[id]")) {
            // Replace '[id]' with a regex pattern and test the pathname
            const regex = new RegExp(`^${p.path.replace("[id]", "\\w+")}$`);
            return regex.test(pathname);
        }
        return p.path === pathname;
    });
    const currenRole = await currentRole()
    if (matchingRoleRoute && currenRole && !matchingRoleRoute.permissions.some(permission => permission.includes(currenRole))) {
        return NextResponse.redirect(new URL("/access-denied", nextUrl));
    }
    return */ /* null */;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
} 