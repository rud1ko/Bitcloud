import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

export interface CustomAuthUser {
	id: string
	name: string
	email: string
	balance: number
	role: UserRole
}

declare module 'next-auth' {
	interface User extends CustomAuthUser {}

	interface Session {
		user?: CustomAuthUser & DefaultSession['user']
	}
}
