import { Typography, TypographyTypes } from '@/shared/Typography'
import { TradeCryptoModule } from '@/widgets/TradeCryptoModule'

const BuyAndSellPage = () => {
	return (
		<div className='max-w-[1190px] w-full m-[0_auto] mt-[57px]'>
			<Typography type={TypographyTypes.H2} title='Buy crypto' />
			<TradeCryptoModule />
		</div>
	)
}

export { BuyAndSellPage }
