import { AuthorizedUserSchema } from '@/entities/User/lib/schema'
import type { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import db from '../db/db'

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				email: { type: 'email', required: true },
				// name: {},
				password: { type: 'password', required: true },
			},
			authorize: async credentials => {
				console.log('credentials', credentials)
				const validatedCredentials = AuthorizedUserSchema.parse(credentials)

				const user = await db.user.findFirst({
					where: {
						email: validatedCredentials.email,
						password: validatedCredentials.password,
					},
				})

				if (!user) {
					throw new Error('Invalid credentials.')
				}

				return {
					id: user.id.toString(),
					email: user.email,
					name: user.name,
				}
			},
		}),
	],
	pages: {
		signIn: '/signIn',
	},
}
