import { Button } from '@/shared/ui/button'
import { signIn } from '@/globals/config/auth'

export const GoogleButton = () => {
	return (
		<form
			action={async () => {
				'use server'
				await signIn('google', { redirectTo: '/profile' })
			}}
		>
			<Button variant={'primary'} className='w-full'>
				Google
			</Button>
		</form>
	)
}
