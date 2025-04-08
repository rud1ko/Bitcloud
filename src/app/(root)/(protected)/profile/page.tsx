import { auth } from '@/globals/config/auth'
import { SignOutButton } from '@/shared/SignOutButton/ui/SignOutButton'

export default async function ProfilePage() {
	const session = await auth()

	console.log(session)

	return (
		<div>
			<h1>{session?.user?.name}</h1>
			<h3>{session?.user?.email}</h3>
			<h3>{session?.user?.balance}</h3>
			<SignOutButton />
		</div>
	)
}
