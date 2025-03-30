import { PrismaClient } from '@prisma/client'
import { initialCoins } from '@/globals/consts'

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
