'use client'
import { resetUserState } from '@/entities/User/model/userSlice'
import { useAppDispatch } from '@/globals/redux/store'
import { Button } from '@/shared/ui/button'
import { signOut } from 'next-auth/react'

export const SignOutButton = () => {
	const dispatch = useAppDispatch()

	const handleSignOut = async () => {
		dispatch(resetUserState())
		await signOut({ redirect: true, callbackUrl: '/' })
	}

	return (
		<Button onClick={handleSignOut} variant={'primary'}>
			Sign Out
		</Button>
	)
}
