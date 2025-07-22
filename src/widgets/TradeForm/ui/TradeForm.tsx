'use client'
import { useAppDispatch, useAppSelector } from '@/app/_lib'
import { Input } from '@/shared/Input'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { enterAmount } from '@/widgets/TradeCryptoModule/model/tradeCryptoSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import swap from '../../../../public/swap.svg'
import { TradeFormFields, TradeFormFieldsSchema } from '../model/TradeForm.type'

export const TradeForm = () => {
	const [isDisabled, setIsDisabled] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const {
		selectedCrypto: { symbol, price },
	} = useAppSelector(state => state.trade)
	const form = useForm<TradeFormFields>({
		resolver: zodResolver(TradeFormFieldsSchema),
		defaultValues: {
			pay: '',
			receive: '',
		},
	})

	const onSubmit = (values: TradeFormFields) => {
		console.log(values)
		dispatch(enterAmount(values))
	}

	const handleTradePay = (event: ChangeEvent<HTMLInputElement>) => {
		const payValue = event.target.value

		const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(payValue)

		if (isValidNumber) {
			setIsDisabled(false)
			const numericPayValue = parseFloat(payValue)
			const numericPrice = parseFloat(price)

			if (!isNaN(numericPayValue) && !isNaN(numericPrice)) {
				console.log(numericPayValue)
				const receiveValue = (numericPayValue / numericPrice).toFixed(6)
				form.setValue('receive', receiveValue)
			} else {
				form.setValue('receive', '')
			}
		} else {
			setIsDisabled(true)
			form.setValue('receive', '')
		}
	}

	const handleTradeReceive = (event: ChangeEvent<HTMLInputElement>) => {
		const receiveValue = event.target.value

		const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(receiveValue)

		if (isValidNumber) {
			setIsDisabled(false)
			const numericReceiveValue = parseFloat(receiveValue)
			const numericPrice = parseFloat(price)

			if (!isNaN(numericReceiveValue) && !isNaN(numericPrice)) {
				console.log(numericReceiveValue)
				const payValue = (numericReceiveValue * numericPrice).toFixed(6)
				form.setValue('pay', payValue)
			} else {
				form.setValue('pay', '')
			}
		} else {
			setIsDisabled(true)
			form.setValue('pay', '')
		}
	}

	const debouncePayRef = useRef(debounce(handleTradePay, 1000))
	const debounceReceiveRef = useRef(debounce(handleTradeReceive, 1000))

	const handleChangePayField = (
		onChange: any,
		event: ChangeEvent<HTMLInputElement>
	) => {
		onChange(event)
		debouncePayRef.current(event)
	}

	const handleChangeReceiveField = (
		onChange: any,
		event: ChangeEvent<HTMLInputElement>
	) => {
		onChange(event)
		debounceReceiveRef.current(event)
	}

	return (
		<div className='mt-[45px]'>
			<Form {...form}>
				<form
					className='flex flex-col items-end'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='flex items-end w-full'>
						<FormField
							control={form.control}
							name='pay'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Pay</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												className='pr-[50px]'
												required
												{...field}
												onChange={event => {
													handleChangePayField(field.onChange, event)
												}}
											/>
											<Typography
												type={TypographyTypes.TEXT}
												title='USD'
												weight='reg'
												className='absolute top-[9px] right-[10px]'
												color='gray'
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Image className='m-[0_24px]' src={swap} alt='Swap' />
						<FormField
							control={form.control}
							name='receive'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Receive</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												className='pr-[50px]'
												required
												{...field}
												onChange={event => {
													handleChangeReceiveField(field.onChange, event)
												}}
											/>
											<Typography
												type={TypographyTypes.TEXT}
												title={symbol}
												weight='reg'
												className='absolute top-[9px] right-[10px]'
												color='gray'
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='flex max-w-[151px] mt-[16px]'
						variant={'primary'}
						type='submit'
						disabled={isDisabled}
					>
						Continue
					</Button>
				</form>
			</Form>
		</div>
	)
}
