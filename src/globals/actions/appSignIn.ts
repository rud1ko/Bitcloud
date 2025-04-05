'use server'

import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { executeAction } from '../utils/executeActions'

const appSignIn = async (formData: FormData) => {
	console.log(formData.get('email'))
	const res = await executeAction({
		actionFn: async () => {
			await signIn('credentials', {
				email: formData.get('email'),
				password: formData.get('password'),
				redirect: false,
			})
		},
		successMessage: 'Signed up successfully',
	})

	console.log(res)

	if (res.success) {
		redirect('/')
	}
}

export { appSignIn }
