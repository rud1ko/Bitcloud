import { Card } from '@/entities/Card'
import { getTopCoins } from '../api/getTopCoins'


export const TopCoins = async () => {
	const coins = await getTopCoins()

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
