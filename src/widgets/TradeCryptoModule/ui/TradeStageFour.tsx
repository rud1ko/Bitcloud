'use client'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'
import { useAppDispatch, useAppSelector } from '@/globals/redux/store'
import { resetTradeState } from '@/widgets/TradeCryptoModule/model/tradeCryptoSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useCreateTransaction } from '@/widgets/TradeCryptoModule/api/useCreateTransaction'

export const TradeStageFour = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { data: session } = useSession()
	const { enterAmount, selectedCrypto } = useAppSelector(state => state.trade)
	const { mutate: createTransaction, isPending } = useCreateTransaction()
	const [isTransactionCreated, setIsTransactionCreated] = useState(false)

	useEffect(() => {
		if (session?.user?.id && !isTransactionCreated) {
			createTransaction({
				userId: session.user.id,
				amountUSD: Number(enterAmount.pay),
				amountBTC: Number(enterAmount.receive),
				serviceFee: 0.000
			}, {
				onSuccess: () => {
					setIsTransactionCreated(true)
				},
				onError: (error) => {
					console.error('Failed to create transaction:', error)
				}
			})
		}
	}, [session?.user?.id, enterAmount, createTransaction, isTransactionCreated])

	const handleGoHome = () => {
		dispatch(resetTradeState())
		router.push('/')
	}

	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardHeader>
					<CardTitle>Transaction Details</CardTitle>
					<CardDescription>
						{isPending ? 'Processing your transaction...' : 'Your transaction has been completed successfully'}
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex justify-between items-center'>
						<span className='text-muted-foreground'>You will pay</span>
						<span className='font-medium'>${enterAmount.pay}</span>
					</div>
					<Separator />
					<div className='flex justify-between items-center'>
						<span className='text-muted-foreground'>You will receive</span>
						<span className='font-medium'>{enterAmount.receive} {selectedCrypto.symbol}</span>
					</div>
					<Separator />
					<div className='flex justify-between items-center'>
						<span className='text-muted-foreground'>Service fee</span>
						<span className='font-medium'>0.000 BTC</span>
					</div>
				</CardContent>
			</Card>
			<Button
				variant='default'
				className='w-full'
				onClick={handleGoHome}
				disabled={isPending}
			>
				{isPending ? 'Processing...' : 'Go to Home'}
			</Button>
		</div>
	)
}