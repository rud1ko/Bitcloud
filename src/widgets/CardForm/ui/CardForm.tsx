'use client'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAppDispatch } from '@/app/_lib'
import { goNext } from '@/widgets/TradeCryptoModule/model/tradeCryptoSlice'

const cardSchema = z.object({
	cardNumber: z.string()
		.refine(value => value.replace(/\s/g, '').length === 16, {
			message: 'Card number must be 16 digits'
		})
		.refine(value => /^[\d\s]+$/.test(value), {
			message: 'Card number must contain only digits and spaces'
		}),
	cardHolder: z.string()
		.min(3, { message: 'Card holder name is too short' })
		.regex(/^[A-Za-z\s]+$/, { message: 'Card holder name must contain only letters' }),
	expirationDate: z.string()
		.regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: 'Invalid expiration date format (MM/YY)' }),
	cvc: z.string()
		.min(3, { message: 'CVC must be 3 digits' })
		.max(3, { message: 'CVC must be 3 digits' })
		.regex(/^\d+$/, { message: 'CVC must contain only digits' }),
})

type CardFormType = z.infer<typeof cardSchema>

export const CardForm = () => {
	const dispatch = useAppDispatch()

	const form = useForm<CardFormType>({
		resolver: zodResolver(cardSchema),
		defaultValues: {
			cardNumber: '',
			cardHolder: '',
			expirationDate: '',
			cvc: '',
		},
	})

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

	const onSubmit = (values: CardFormType) => {
		dispatch(goNext())
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-[32px]'
				onSubmit={form.handleSubmit(onSubmit)}
			>
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
				<Button variant={'primary'} type='submit'>
					Pay Now
				</Button>
			</form>
		</Form>
	)
}