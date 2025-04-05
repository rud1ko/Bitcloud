export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/buyAndSell', '/profile', '/exchange', '/market', '/wallet'],
}
