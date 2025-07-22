'use client'
import {
	NonAuthorizedUserSchema,
	NonAuthorizedUserType,
} from '@/entities/User/lib/schema'
import { register } from '@/entities/User/actions'
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

export const SignUpForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const form = useForm<NonAuthorizedUserType>({
		resolver: zodResolver(NonAuthorizedUserSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			cardNumber: '',
			cardHolder: '',
			expirationDate: '',
			cvc: '',
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

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
		const matches = v.match(/\d{4,16}/g)
		const match = (matches && matches[0]) || ''
		const parts = []

		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4))
		}

		if (parts.length) {
			return parts.join(' ')
		} else {
			return value
		}
	}

	const formatExpirationDate = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
		if (v.length >= 3) {
			return `${v.substring(0, 2)}/${v.substring(2, 4)}`
		}
		return v
	}

	const onSubmit = (values: NonAuthorizedUserType) => {
		setSuccess('')
		setError('')

		startTransition(() => {
			register(values).then(data => {
				if (data.error) return setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWithLabel
									{...field}
									label='Name'
									placeholder='Nickname or firstname'
									type='text'
									id='name'
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
									placeholder='*****'
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
				<div className="flex flex-col gap-4">
					<h3 className="text-lg font-semibold">Card Information</h3>
					<FormField
						control={form.control}
						name='cardNumber'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithLabel
										{...field}
										label='Card Number'
										placeholder='1234 5678 9012 3456'
										type='text'
										id='cardNumber'
										required
										disable={isPending}
										maxLength={19}
										onChange={(e) => {
											const formatted = formatCardNumber(e.target.value)
											field.onChange(formatted)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='cardHolder'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithLabel
										{...field}
										label='Card Holder'
										placeholder='JOHN DOE'
										type='text'
										id='cardHolder'
										required
										disable={isPending}
										onChange={(e) => {
											field.onChange(e.target.value.toUpperCase())
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-4">
						<FormField
							control={form.control}
							name='expirationDate'
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<InputWithLabel
											{...field}
											label='Expiration Date'
											placeholder='MM/YY'
											type='text'
											id='expirationDate'
											required
											disable={isPending}
											maxLength={5}
											onChange={(e) => {
												const formatted = formatExpirationDate(e.target.value)
												field.onChange(formatted)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='cvc'
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<InputWithLabel
											{...field}
											label='CVC'
											placeholder='123'
											type='text'
											id='cvc'
											required
											disable={isPending}
											maxLength={3}
											onChange={(e) => {
												const value = e.target.value.replace(/\D/g, '')
												field.onChange(value)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button variant={'primary'} type='submit'>
					Sign Up
				</Button>
			</form>
		</Form>
	)
}
