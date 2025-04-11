import { TradeCryptoHeader } from './TradeCryptoHeader'
import { TradeStageFour } from './TradeStageFour'
import { TradeStageOne } from './TradeStageOne'
import { TradeStageThree } from './TradeStageThree'
import { TradeStageTwo } from './TradeStageTwo'

export const TradeCryptoSkin: React.FC<{ activeStep: number }> = ({
	activeStep,
}) => {
	const tradeStage = () => {
		if (activeStep === 1) {
			return <TradeStageOne />
		} else if (activeStep === 2) {
			return <TradeStageTwo />
		} else if (activeStep === 3) {
			return <TradeStageThree />
		} else {
			return <TradeStageFour />
		}
	}

	return (
		<div className='flex-grow p-[40px] ml-[64px] shadow-card rounded-[16px] w-[736px]'>
			<TradeCryptoHeader activeStep={activeStep} />
			{tradeStage()}
		</div>
	)
}
