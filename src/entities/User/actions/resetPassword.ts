'use server'
import { db } from '@/app/_lib'
import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import {
	ResetPasswordSchema,
	ResetPasswordType,
} from '@/entities/User/lib/schema'
import bcrypt from 'bcryptjs'
import { executeAction } from '@/shared/lib'

async function reset(values: ResetPasswordType) {
	console.log(values)
	const validatedParams = ResetPasswordSchema.safeParse(values)

	if (!validatedParams.success) {
		return { error: 'Invalid fields' }
	}

	const { email, password, confirmPassword } = validatedParams.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser) {
		return { error: 'There is no user with this email' }
	}

	if (password !== confirmPassword) {
		return { error: 'The passwords do not match' }
	}

	const encryptedPassword = await bcrypt.hash(password, 10)

	const res = await executeAction({
		actionFn: async () => {
			await db.user.update({
				where: { email },
				data: {
					password: encryptedPassword,
				},
			})
		},
		successMessage: 'Password successfully updated',
	})

	if (!res.success) {
		return { error: res.message }
	}

	return { success: res.message }
}

export { reset }
