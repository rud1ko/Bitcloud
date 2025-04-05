import { Card } from '@/entities/Card'
import { getTopCoins } from '../api/getTopCoins'

const formattedValue = parseFloat('82610.3027247453685831').toFixed(2)
const formattedValueVhap = parseFloat('83662.2339597589667757').toFixed(2)

export const TopCoins = async () => {
	const coins = await getTopCoins()

	console.log(coins)

	return (
		<div className='flex justify-between bg-white-custom rounded-[10px] p-[25px_38px]'>
			{coins.map(coin => (
				<Card
                    key={coin.symbol}
					symbol={coin.symbol}
					title={coin.title}
					changePercent={coin.changePercent}
					priceUsd={coin.priceUsd}
					vwap24Hr={coin.vwap24Hr}
				/>
			))}
		</div>
	)
}
