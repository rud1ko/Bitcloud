'use server'
import { NonAuthorizedUserSchema } from '@/entities/User/lib/schema'
import { redirect } from 'next/navigation'
import db from '../db/db'
import { executeAction } from '../utils/executeActions'

const signUp = async (formData: FormData) => {
	const res = await executeAction({
		actionFn: async () => {
			const email = formData.get('email')
			const password = formData.get('password')
			const name = formData.get('name')
			const validatedData = NonAuthorizedUserSchema.parse({
				email,
				password,
				name,
			})
			await db.user.create({
				data: {
					email: validatedData.email,
					password: validatedData.password,
					name: validatedData.name,
				},
			})
		},
		successMessage: 'Signed up successfully',
	})

	if (res.success) {
		redirect('/signIn')
	}
}

export { signUp }
