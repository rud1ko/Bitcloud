'use server'
import { db } from '@/app/_lib'
import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import {
	NonAuthorizedUserSchema,
	NonAuthorizedUserType,
} from '@/entities/User/lib/schema'
import bcrypt from 'bcryptjs'
import { executeAction } from '@/shared/lib'

const register = async (values: NonAuthorizedUserType) => {
	const validatedParams = NonAuthorizedUserSchema.safeParse(values)

	if (!validatedParams.success) {
		return { error: 'Invalid fields' }
	}

	const { password, email, name, cardNumber, cardHolder, expirationDate, cvc } =
		validatedParams.data
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
					card: {
						create: {
							cardNumber: cardNumber.replace(/\s/g, ''),
							cardHolder,
							expirationDate,
							cvc,
							balance: 0,
						},
					},
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
