'use client'
import { Button } from '@/shared/ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export const GoogleButton = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/profile'

	return (
		<Button
			variant={'primary'}
			onClick={() => signIn('google', { callbackUrl })}
			className='w-full'
		>
			Google
		</Button>
	)
}
