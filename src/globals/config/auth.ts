import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import { getUserById } from '@/entities/User/api/getUserById'
import { AuthorizedUserSchema } from '@/entities/User/lib/schema'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import db from '../db/db'
import { UserRole } from '@prisma/client'

const authOptions = {
	adapter: PrismaAdapter(db),
	callbacks: {
		async jwt({ token, user }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			if (user) {
				token.id = user.id
				token.balance = user.balance
				token.role = existingUser.role
			}
			return token
		},
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub

				if (typeof token.balance === 'number') {
					session.user.balance = token.balance as number
				}

				if (token.role) {
					session.user.role = token.role as UserRole
				}
			}

			return session
		},
	},
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
					console.log("User", user)
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						balance: user.balance,
					} as User
				}

				return null
			},
		}),
	],
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
