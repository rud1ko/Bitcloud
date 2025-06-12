import { NextResponse } from 'next/server'
import db from '@/globals/db/db'
import { auth } from '@/globals/config/auth'

export async function POST(req: Request) {
	try {
		const session = await auth()
		if (!session?.user) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { amountUSD, amountBTC, serviceFee } = body

		console.log('Creating transaction with data:', {
			userId: session.user.id,
			amountUSD,
			amountBTC,
			serviceFee,
		})

		// Get user's card
		const userCard = await db.card.findUnique({
			where: { userId: session.user.id },
			select: { balance: true }
		})

		if (!userCard) {
			return new NextResponse('Card not found', { status: 404 })
		}

		if (userCard.balance < amountUSD) {
			return new NextResponse('Insufficient funds', { status: 400 })
		}

		// Create transaction
		const transaction = await db.transaction.create({
			data: {
				userId: session.user.id,
				amountUSD,
				amountBTC,
				serviceFee,
			},
		})

		console.log('Transaction created:', transaction)

		// Get current user BTC balance
		const user = await db.user.findUnique({
			where: { id: session.user.id },
			select: { balance_BTC: true },
		})

		console.log('Current user BTC balance:', user?.balance_BTC)

		// Calculate new balances
		const newBTCBalance = (user?.balance_BTC || 0) + amountBTC
		const newCardBalance = userCard.balance - amountUSD

		console.log('New balances will be:', {
			BTC: newBTCBalance,
			Card: newCardBalance
		})

		// Update user BTC balance and card balance
		await Promise.all([
			db.user.update({
				where: { id: session.user.id },
				data: { balance_BTC: newBTCBalance },
			}),
			db.card.update({
				where: { userId: session.user.id },
				data: { balance: newCardBalance },
			})
		])

		console.log('Balances updated')

		return NextResponse.json(transaction)
	} catch (error) {
		console.error('[TRANSACTIONS_POST]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
} 