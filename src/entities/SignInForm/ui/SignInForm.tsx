'use client'

import {
	AuthorizedUserSchema,
	AuthorizedUserType,
} from '@/entities/User/lib/schema'
import { login } from '@/globals/actions/login'
import { FormError } from '@/shared/FormResult/ui/FormError'
import { FormSuccess } from '@/shared/FormResult/ui/FormSuccess'
import { InputWithLabel } from '@/shared/InputWithLabel'
import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/shared/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GoogleButton } from './GoogleButton'
import { useRouter } from 'next/navigation'

export const SignInForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()
    const router = useRouter()

	const form = useForm<AuthorizedUserType>({
		resolver: zodResolver(AuthorizedUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	// const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
	// 	event.preventDefault()

	// 	const formData = new FormData(event.currentTarget)

	// 	console.log(formData)

	// 	const res = await signIn('credentials', {
	// 		email: formData.get('email'),
	// 		password: formData.get('password'),
	// 		redirect: false,
	// 	})

	// 	if (res && !res.error) {
	// 		router.push('/')
	// 	} else {
	// 		console.log(res)
	// 	}
	// }

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (success) {
			timeout = setTimeout(() => {
				router.push('/')
			}, 1500)
		}

		return () => clearTimeout(timeout)
	}, [success])

	const onSubmit = (values: z.infer<typeof AuthorizedUserSchema>) => {
		startTransition(() => {
			login(values).then(data => {
				if (data.error) return setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<>
			<div className='max-w-[380px] w-full'>
				<GoogleButton />
			</div>
			<Form {...form}>
				<form
					className='flex flex-col gap-[32px] mt-[32px] max-w-[380px] w-[100%]'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithLabel
										{...field}
										label='Email'
										placeholder='Email address'
										type='email'
										id='email'
										required
										disable={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithLabel
										{...field}
										label='Password'
										placeholder='Password'
										type='password'
										id='password'
										required
										disable={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button variant={'primary'} type='submit'>
						Sign In
					</Button>
				</form>
			</Form>
		</>
	)
}
