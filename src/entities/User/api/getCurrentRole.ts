import { auth } from '@/app/_lib'

export const getCurrentRole = async () => {
	const session = await auth()

	return session?.user?.role
}
