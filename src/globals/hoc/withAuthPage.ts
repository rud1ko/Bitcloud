import { redirect } from 'next/navigation'
import { auth } from '../config/auth'

export default function withAuthPage<P extends object>(Component: React.FC<P>) {
	return async function AuthenticatedComponent() {
		const session = await auth()

		if (!session) {
			redirect('/signIn')
		}

		return Component
	}
}
