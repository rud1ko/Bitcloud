'use client'

import {
	ResetPasswordSchema,
	ResetPasswordType,
} from '@/entities/User/lib/schema'
import { reset } from '@/entities/User/actions'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export const ResetForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const form = useForm<ResetPasswordType>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (success) {
			timeout = setTimeout(() => {
				router.push('/signIn')
			}, 1500)
		}

		return () => clearTimeout(timeout)
	}, [success])

	const onSubmit = (values: ResetPasswordType) => {
		startTransition(() => {
			reset(values).then(data => {
				if (data.error) return setError(data.error)
				setSuccess(data.success)
			})
		})
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
										label='New password'
										placeholder='****'
										type='password'
										id='newPassword'
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
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithLabel
										{...field}
										label='Confirm password'
										placeholder='*****'
										type='password'
										id='confirmPassword'
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
						Reset
					</Button>
				</form>
			</Form>
		</>
	)
}
