import { PrismaClient } from '@prisma/client'
import { MOCK_COINS } from '@/entities/Coin/constants'

const prisma = new PrismaClient()

async function coins() {
	await Promise.all(
		MOCK_COINS.map(coin =>
			prisma.coin.create({
				data: coin,
			})
		)
	)
}

coins()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
