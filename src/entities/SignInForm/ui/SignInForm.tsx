'use client'

import {
	AuthorizedUserSchema,
	AuthorizedUserType,
} from '@/entities/User/lib/schema'
import { loginThunk } from '@/entities/User/model/login.thunk'
import { useAppDispatch, useAppSelector } from '@/globals/redux/store'
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
	const { success, status, error } = useAppSelector(state => state.user.request)

	const form = useForm<AuthorizedUserType>({
		resolver: zodResolver(AuthorizedUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		let timeout: NodeJS.Timeout

		if (success) {
			timeout = setTimeout(() => {
				router.push('/')
			}, 1500)
		}

		return () => clearTimeout(timeout)
	}, [success])

	const onSubmit = async (values: AuthorizedUserType) => {
		await dispatch(loginThunk(values)).unwrap()
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
										disable={status === 'pending'}
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
										disable={status === 'pending'}
									/>
								</FormControl>
								<Button asChild variant={'link'} size={'sm'} className='px-0'>
									<Link href={'/forgotPassword'}>Forgot password?</Link>
								</Button>
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
