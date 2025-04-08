import { auth } from '@/globals/config/auth'

export const getCurrentRole = async () => {
	const session = await auth()

	return session?.user?.role
}
