import { AuthorizedUserSchema } from '@/entities/User/lib/schema'
import type { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import db from '../db/db'

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		Credentials({
			credentials: {
				email: { type: 'email', required: true },
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
					balance: user.balance,
				}
			},
		}),
	],
	// callbacks: {
	// 	async jwt({ token, user }) {
	// 		// Если пользователь существует, добавляем его данные в токен
	// 		if (user) {
	// 			token.id = user.id
	// 			token.balance = user.balance // Добавляем balance в токен
	// 		}
	// 		return token
	// 	},
	// 	async session({ session, token }) {
	// 		// Добавляем данные из токена в сессию
	// 		if (token) {
	// 			session.user.id = token.id
	// 			session.user.balance = token.balance // Добавляем balance в сессию
	// 		}
	// 		return session
	// 	},
	// },
	pages: {
		signIn: '/signIn',
	},
}
