'use client'

import { InputWithLabel } from '@/shared/InputWithLabel'
import { Button } from '@/shared/ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { FormEventHandler } from 'react'
import { GoogleButton } from './GoogleButton'

export const SignInForm = () => {
	const router = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		console.log(formData)

		const res = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		})

		if (res && !res.error) {
			router.push('/')
		} else {
			console.log(res)
		}
	}

	return (
		<>
			<div className='max-w-[380px] w-full'>
				<GoogleButton />
			</div>
			<form
				className='flex flex-col gap-[32px] mt-[32px] max-w-[380px] w-[100%]'
				onSubmit={handleSubmit}
			>
				<InputWithLabel
					label='Email'
					placeholder='Email address'
					type='email'
					id='email'
					required
				/>
				<InputWithLabel
					label='Password'
					placeholder='Password'
					type='password'
					id='password'
					required
				/>
				<Button variant={'primary'} type='submit'>
					Sign In
				</Button>
			</form>
		</>
	)
}
