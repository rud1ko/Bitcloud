'use client'

import { useAppSelector } from '@/app/_lib'
import { TradeProcessMock } from '@/shared/TradeProcess/const/TradeProcessMock.const'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { useMemo } from 'react'
import { TradeCryptoHeaderBack } from './TradeCryptoHeaderBack'

export const TradeCryptoHeader: React.FC<{ activeStep: number }> = ({
	activeStep,
}) => {
	const {
		selectedCrypto: { name, symbol },
	} = useAppSelector(state => state.trade)

	const title = useMemo(() => {
		switch (activeStep) {
			case 1:
				return <Typography type={TypographyTypes.H4} title='Select crypto' />
			case 2:
			case 3:
			case 4:
				return (
					<TradeCryptoHeaderBack
						cryptoName={name}
						title={TradeProcessMock[activeStep - 1].title}
                        symbol={symbol}
					/>
				)
			default:
				break
		}
	}, [activeStep])

	return <div className='mb-[20px]'>{title}</div>
}
