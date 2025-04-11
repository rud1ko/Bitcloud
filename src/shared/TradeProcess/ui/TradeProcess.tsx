import { TradeProcessMock } from '../const/TradeProcessMock.const'
import { TradeStep } from './TradeStep'

export const TradeProcess: React.FC<{ activeStep: number }> = ({
	activeStep,
}) => {
	return (
		<aside className='w-[220px] mr-auto'>
			{TradeProcessMock.map(el => (
				<TradeStep
					key={el.step}
					step={el.step}
					title={el.title}
					variant={
						el.step === activeStep
							? 'active'
							: el.step < activeStep
							? 'passed'
							: 'unactive'
					}
				/>
			))}
		</aside>
	)
}
