import { Coin } from '../model'

export type UpdateAllCoins = {
	data: Coin[]
}

export const updateAllCoins = async () => {
	try {
		const res = await fetch('http://localhost:3000/api/coins/external', {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const result = (await res.json()) as UpdateAllCoins

		return result.data
	} catch (error) {
		throw new Error('Error')
	}
}
