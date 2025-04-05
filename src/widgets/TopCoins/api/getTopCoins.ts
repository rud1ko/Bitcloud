import { CardProps } from '@/entities/Card'
import { Coin } from '@prisma/client'

export const getTopCoins = async (): Promise<CardProps[]> => {
	try {
		const response = await fetch(
			`${process.env.HOST}/api/coins?limit=4&isRank=true`
		)

		console.log(response)

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`)
		}

		const data: Coin[] = await response.json()

		const transferData: CardProps[] = data.map(coin => ({
			title: coin.id,
			symbol: coin.symbol,
			changePercent: parseFloat(coin.changePercent24Hr).toFixed(2),
			priceUsd: parseFloat(coin.priceUsd).toLocaleString('en-Us'),
			...(coin.vwap24Hr && {
				vwap24Hr: parseFloat(coin.vwap24Hr).toLocaleString('en-Us'),
			}),
		}))

		return transferData
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
		return []
	}
}
