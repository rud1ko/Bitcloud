'use server'
import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import {
	NonAuthorizedUserSchema,
	NonAuthorizedUserType,
} from '@/entities/User/lib/schema'
import bcrypt from 'bcryptjs'
import db from '../db/db'
import { executeAction } from '../utils/executeActions'

const register = async (values: NonAuthorizedUserType) => {
	const validatedParams = NonAuthorizedUserSchema.safeParse(values)

	if (!validatedParams.success) {
		return { error: 'Invalid fields' }
	}

	const { password, email, name } = validatedParams.data
	const encryptedPassword = await bcrypt.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Email already in use' }
	}

	const res = await executeAction({
		actionFn: async () => {
			await db.user.create({
				data: {
					email,
					password: encryptedPassword,
					name,
				},
			})
		},
		successMessage: 'User created successfully',
	})

	if (!res.success) {
		return { error: res.message }
	}

	return { success: res.message }
}

export { register }
