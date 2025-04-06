'use client'
import withAuthPage from '@/globals/hoc/withAuthPage'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function ProfilePage() {
	const session = useSession()

	console.log(session)

	return (
		<div>
			<h1>{session?.data?.user?.name}</h1>
			<h3>{session?.data?.user?.email}</h3>
			<Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
				Sign Out
			</Link>
		</div>
	)
}

export default withAuthPage(ProfilePage)