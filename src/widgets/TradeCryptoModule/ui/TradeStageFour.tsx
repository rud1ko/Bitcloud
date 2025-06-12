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
import { useComments } from '@/widgets/TradeCryptoModule/api/useComments'
import { Textarea } from '@/shared/ui/textarea'
import { format } from 'date-fns'
import { Comment } from '@/shared/api/commentService'

export const TradeStageFour = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { data: session } = useSession()
	const { enterAmount, selectedCrypto } = useAppSelector(state => state.trade)
	const { mutate: createTransaction, isPending } = useCreateTransaction()
	const [isTransactionCreated, setIsTransactionCreated] = useState(false)
	const [comment, setComment] = useState('')
	const { comments, isLoading: isLoadingComments, createComment, isCreating } = useComments(selectedCrypto.id)

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

	const handleSubmitComment = () => {
		if (comment.trim()) {
			createComment({
				content: comment.trim(),
				cryptoId: selectedCrypto.id
			})
			setComment('')
		}
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

			<Card>
				<CardHeader>
					<CardTitle>Comments</CardTitle>
					<CardDescription>
						Share your experience with {selectedCrypto.name}
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					{isLoadingComments ? (
						<div>Loading comments...</div>
					) : (
						<div className='space-y-4'>
							{comments?.map((comment: Comment) => (
								<div key={comment.id} className='p-4 bg-muted rounded-lg'>
									<div className='flex justify-between items-start mb-2'>
										<span className='font-medium'>{comment.user.name}</span>
										<span className='text-sm text-muted-foreground'>
											{format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}
										</span>
									</div>
									<p className='text-sm'>{comment.content}</p>
								</div>
							))}
						</div>
					)}
					<div className='space-y-2'>
						<Textarea
							placeholder='Share your experience...'
							value={comment}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
							className='min-h-[100px]'
						/>
						<Button
							variant='secondary'
							onClick={handleSubmitComment}
							disabled={!comment.trim() || isCreating}
						>
							{isCreating ? 'Posting...' : 'Post Comment'}
						</Button>
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