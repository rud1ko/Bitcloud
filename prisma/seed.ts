import { initialCoins } from '@/shared/consts/coins/initialCoins'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await Promise.all(
		initialCoins.map(coin =>
			prisma.coin.create({
				data: coin,
			})
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
