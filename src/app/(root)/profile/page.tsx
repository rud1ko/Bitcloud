'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function ProfilePage() {
	return (
		<div>
			<Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
				Sign Out
			</Link>
		</div>
	)
}
