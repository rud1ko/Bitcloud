import { UpdateAllCoins } from '@/entities/Coin/api/updateAllCoins'
import db from '@/globals/db/db'

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.EXTERNAL_API_REST_URL}/assets`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_EXTERNAL_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			const errorText = await response.text()
			return Response.json(
				{ error: 'API Error', status: response.status, details: errorText },
				{ status: response.status }
			)
		}

		const result: UpdateAllCoins = await response.json()

		const topCoins = result.data.slice(0, 10)

		await Promise.allSettled(
			topCoins.map(coin =>
				db.coin.update({
					where: { id: coin.id },
					data: {
						rank: coin.rank,
						marketCapUsd: coin.marketCapUsd,
						priceUsd: coin.priceUsd,
						supply: coin.supply,
						maxSupply: coin.maxSupply,
						volumeUsd24Hr: coin.volumeUsd24Hr,
						changePercent24Hr: coin.changePercent24Hr,
						vwap24Hr: coin.vwap24Hr,
					},
				})
			)
		)

		return Response.json(topCoins)
	} catch (error) {
		return Response.json(
			{
				error: 'Internal Server Error',
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		)
	}
}
