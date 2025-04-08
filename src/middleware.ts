import { authOptions } from '@/globals/config/auth'
import NextAuth from 'next-auth'
import {
	adminPrefix,
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutes,
} from '../routes'

const { auth: middleware } = NextAuth(authOptions)

export default middleware(req => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	const role = req.auth?.user?.role

	if (isApiAuthRoute) {
		return
	}

	if (isAdminRoute) {
		if (role !== "ADMIN") {
			return Response.redirect(new URL('/', nextUrl))
		}
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}

		return
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/signIn', nextUrl))
	}

	return
})

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|public/|.*\\.png).*)',
	],
}
