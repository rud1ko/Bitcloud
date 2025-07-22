'use server'
import { signIn } from '@/app/_lib'
import { getUserByEmail } from '@/entities/User/api/getUserByEmail'
import { AuthorizedUserType } from '@/entities/User/lib/schema'
import { executeAction } from '@/shared/lib'

async function login(values: AuthorizedUserType) {
	const res = await executeAction({
		actionFn: async () => {
			await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})
		},
		successMessage: 'Signed in successfully',
	})

	const existingUser = await getUserByEmail(values.email)

	if (!res.success) {
		return { error: res.message }
	}

	if (existingUser) {
		return { success: res.message, user: existingUser }
	}

	return { success: res.message }
}

export { login }
