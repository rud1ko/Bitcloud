'use client'
import { useAppSelector } from '@/globals/redux/store'
import { TradeProcess } from '@/shared/TradeProcess'
import { TradeCryptoSkin } from './TradeCryptoSkin'

export const TradeCryptoModule = () => {
	const { activeStep } = useAppSelector(state => state.trade)

	return (
		<div className='flex mt-[64px]'>
			<TradeProcess activeStep={activeStep} />
			<TradeCryptoSkin activeStep={activeStep} />
		</div>
	)
}
