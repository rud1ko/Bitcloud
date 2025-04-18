export interface Coin {
	id: string
	rank: string
	symbol: string
	name: string
	supply: string
	maxSupply: string | null
	marketCapUsd: string
	volumeUsd24Hr: string
	priceUsd: string
	changePercent24Hr: string
	vwap24Hr: string | null
	explorer: string | null
}
