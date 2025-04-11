import { Typography, TypographyTypes } from '@/shared/Typography'
import { cva, VariantProps } from 'class-variance-authority'

export const tradeStepVariants = cva(
	'flex justify-center items-center relative mr-[16px] w-[32px] h-[32px] border-[2px] rounded-[50%] transition duration-200',
	{
		variants: {
			variant: {
				active: 'border-primary-custom',
				unactive: 'border-unactive',
				passed:
					'border-primary-custom bg-primary-custom after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-[50%] after:bg-passed after:opacity-100 after:bg-no-repeat after:bg-center after:bg-[length:16px_auto] after:bg-primary-custom',
			},
		},
	}
)

// content: "";
// position: absolute;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// border-radius: 50%;
// background: #58BD7D url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath d='M4 8l2.667 2.667L12 5.333' stroke='%23fcfcfd' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E) no-repeat 50% 50% / 16px auto;
// opacity: 0;
// transition: opacity .2s;

export const tradeStepWrapperVariants = cva(
	'flex relative items-center mb-[24px] last:mb-0 h-[48px] p-[0_8px] after:content-[""] last:after:content-none after:absolute after:top-full after:left-[23px] after:h-[24px] after:border-l-2 after:border-dashed after:border-unactive',
	{
		variants: {
			variant: {
				passed: 'bg-white-custom rounded-[24px] shadow-card',
			},
		},
	}
)

export type TradeStepEntity = {
	step: number
	title: string
}

type TradeStepProps = {} & VariantProps<typeof tradeStepVariants> &
	TradeStepEntity

export const TradeStep: React.FC<TradeStepProps> = ({
	step,
	title,
	variant,
}) => {
	const wrapperVariant = variant === 'passed' ? 'passed' : null

	return (
		<div className={tradeStepWrapperVariants({ variant: wrapperVariant })}>
			<div className={tradeStepVariants({ variant })}>
				<Typography type={TypographyTypes.TEXT} title={step.toString()} />
			</div>
			<Typography type={TypographyTypes.H6} title={title} />
		</div>
	)
}
