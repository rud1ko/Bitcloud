import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../config/auth'

export default function withAuthPage<P extends object>(Component: React.FC<P>) {
	return async function AuthenticatedComponent() {
		const session = await getServerSession(authOptions)

		if (!session) {
			redirect('/signIn')
		}

		return Component
	}
}
