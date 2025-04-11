import { useAppSelector } from '@/globals/redux/store'
import { valueRounder } from '@/globals/utils/valueRounder'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { TradeForm } from '@/widgets/TradeForm/ui/TradeForm'

export const TradeStageTwo = () => {
	const {
		selectedCrypto: { symbol, price },
	} = useAppSelector(state => state.trade)

	return (
		<div>
			<Typography
				type={TypographyTypes.H6}
				title={`Reference Price: ${valueRounder(price, 2)} USD/${symbol}`}
				weight='reg'
			/>
			<TradeForm />
		</div>
	)
}
