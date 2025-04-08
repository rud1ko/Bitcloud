'use client'
import { signIn } from '@/globals/config/auth'
import { Button } from '@/shared/ui/button'
import { useSearchParams } from 'next/navigation'

export const GoogleButton = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/profile'

	return (
		<Button
			variant={'primary'}
			onClick={() => signIn('google', { redirectTo: callbackUrl })}
            className='w-full'
		>
			Google
		</Button>
	)
}
