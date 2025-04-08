import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import { AuthorizedUserSchema } from '@/entities/User/lib/schema'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import db from '../db/db'

const authOptions = {
	adapter: PrismaAdapter(db),
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

				const user = await getUserByEmail(validatedCredentials.email)

				if (!user || !user.password) {
					throw new Error('Invalid credentials.')
				}

				const passwordMatch = await bcrypt.compare(
					validatedCredentials.password,
					user.password
				)

				if (passwordMatch) {
					console.log('balance', user.balance)
					return {
						id: user.id.toString(),
						email: user.email,
						name: user.name,
						balance: user.balance,
					} as User
				}

				return null
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
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/signIn',
	},
} satisfies NextAuthConfig

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth(authOptions)

export { authOptions }
