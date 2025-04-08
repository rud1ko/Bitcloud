import { signOut } from '@/globals/config/auth'
import { Button } from '@/shared/ui/button'

export const SignOutButton = async () => {
	return (
		<form
			action={async () => {
				'use server'

				await signOut({ redirectTo: '/' })
			}}
		>
			<Button variant={'primary'}>Sign Out</Button>
		</form>
	)
}
