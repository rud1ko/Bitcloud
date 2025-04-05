import { Typography, TypographyTypes } from '@/shared/Typography'
import { cva } from 'class-variance-authority'
import { PercentBadgeProps } from '../model/PercentBadge.interface'

export const percentBadgeVariants = cva(
	'w-[55px] rounded-[10px] text-center p-[2px] bg-primary-custom',
	{
		variants: {
			variant: {
				upper: 'bg-success',
			},
		},
	}
)

export const PercentBadge: React.FC<PercentBadgeProps> = ({
	percent,
	variant,
}) => {
	return (
		<div className={percentBadgeVariants({ variant })}>
			<Typography
				type={TypographyTypes.TEXT}
				title={`${percent}%`}
				weight='reg'
				color='white'
			/>
		</div>
	)
}
