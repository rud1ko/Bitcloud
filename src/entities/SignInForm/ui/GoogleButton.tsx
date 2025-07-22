import { Button } from '@/shared/ui/button'
import { signIn } from '@/app/_lib'

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
