import { useAppSelector } from '@/app/_lib'
import { valueRounder } from '@/shared/lib'
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
