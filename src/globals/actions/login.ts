'use server'
import {
	AuthorizedUserSchema,
	AuthorizedUserType,
} from '@/entities/User/lib/schema'
import { executeAction } from '../utils/executeActions'
import { signIn } from '../config/auth'

async function login(values: AuthorizedUserType) {
	const validatedParams = AuthorizedUserSchema.safeParse(values)

	if (!validatedParams.success) {
		return { error: 'Invalid fields' }
	}

	const res = await executeAction({
		actionFn: async () => {
			await signIn('credentials', {
				email: validatedParams.data?.email,
				password: validatedParams.data?.password,
				redirect: false,
			})
		},
		successMessage: 'Signed in successfully',
	})

	if (!res.success) {
		return { error: res.message }
	}

	return { success: res.message }
}

export { login }
