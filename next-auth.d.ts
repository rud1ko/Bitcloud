import { DefaultSession, User } from 'next-auth'

export interface CustomAuthUser extends User {
	balance: number
}

declare module 'next-auth' {
	interface User extends CustomAuthUser {}

	interface Session {
		user?: CustomAuthUser & DefaultSession['user']
	}
}
