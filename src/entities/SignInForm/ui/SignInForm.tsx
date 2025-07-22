'use client'

import {
	AuthorizedUserSchema,
	AuthorizedUserType,
} from '@/entities/User/lib/schema'
import { loginThunk } from '@/widgets/User/model/login.thunk'
import { useAppDispatch, useAppSelector } from '@/app/_lib'
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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GoogleButton } from './GoogleButton'

export const SignInForm = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const userState = useAppSelector(state => state.user)
	const request = userState?.request || {
		status: null,
		success: null,
		error: null
	}

	const form = useForm<AuthorizedUserType>({
		resolver: zodResolver(AuthorizedUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		let timeout: NodeJS.Timeout

		if (request.success) {
			timeout = setTimeout(() => {
				router.push('/profile')
			}, 1500)
		}

		return () => clearTimeout(timeout)
	}, [request.success, router])

	const onSubmit = async (values: AuthorizedUserType) => {
		try {
			await dispatch(loginThunk(values)).unwrap()
		} catch (error) {
			// Ошибка уже обрабатывается в userSlice
			console.error('Login failed:', error)
		}
	}

	return (
		<>
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
										disable={request.status === 'pending'}
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
										disable={request.status === 'pending'}
									/>
								</FormControl>
								<Button asChild variant={'link'} size={'sm'} className='px-0'>
									<Link href={'/forgotPassword'}>Forgot password?</Link>
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormError message={request.error} />
					<FormSuccess message={request.success} />
					<Button 
						variant={'primary'} 
						type='submit'
						disabled={request.status === 'pending'}
					>
						{request.status === 'pending' ? 'Signing in...' : 'Sign In'}
					</Button>
				</form>
			</Form>
		</>
	)
}
