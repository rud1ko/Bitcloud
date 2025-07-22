import { AuthError } from 'next-auth'

type Options<T> = {
	actionFn: () => Promise<T>
	successMessage?: string
}

const executeAction = async <T>({
	actionFn,
	successMessage = 'The actions was successful',
}: Options<T>): Promise<{ success: boolean; message: string }> => {
	try {
		await actionFn()

		return {
			success: true,
			message: successMessage,
		}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { success: false, message: 'Invalid credentials!' }
				default:
					return { success: false, message: 'Something went wrong' }
			}
		}

		console.log(error)

		return {
			success: false,
			message: 'An error has occurred during executing the action',
		}
	}
}

export { executeAction }
