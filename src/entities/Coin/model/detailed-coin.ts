export interface IDetailedCoin {
	id: string
	symbol: string
	name: string
	image: string
	current_price: number
	price_change_percentage_24h: number
	market_cap: number
	market_cap_rank: number
	total_volume: number
	high_24h: number
	low_24h: number
	price_change_24h: number
	price_change_percentage_24h_in_currency: number
	price_change_percentage_7d_in_currency: number
	price_change_percentage_14d_in_currency: number
	price_change_percentage_30d_in_currency: number
	price_change_percentage_1y_in_currency: number
	price_change_percentage_200d_in_currency: number
	price_change_percentage_1h_in_currency: number
	market_cap_change_24h: number
	market_cap_change_percentage_24h: number
	total_supply: number
	max_supply: number
	circulating_supply: number
	last_updated: string
	sparkline_in_7d: {
		price: number[]
	}
} 