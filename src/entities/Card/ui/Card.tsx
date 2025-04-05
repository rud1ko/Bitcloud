import { Icon } from '@/shared/Icons/ui/Icon'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { CardProps } from '../model/Card.interface'
import { PercentBadge } from './PercentBadge'

export const Card: React.FC<CardProps> = ({
	title,
	priceUsd,
	changePercent,
	symbol,
	vwap24Hr,
}) => {
	return (
		<div className='w-[215px] rounded-[10px] p-[16px_21px_20px_14px] hover:shadow-card transition duration-200'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<Icon title={title} />
					<Typography
						type={TypographyTypes.TEXT}
						title={title}
						className='ml-[16px]'
					/>
				</div>
				<Typography
					type={TypographyTypes.TEXT}
					title={`${symbol}/USDT`}
					weight='reg'
				/>
			</div>
			<div className='mt-[12px]'>
				<Typography type={TypographyTypes.H5} title={`USD ${priceUsd}`} />
			</div>
			<div className='mt-[8px] flex items-center justify-between'>
				<Typography
					type={TypographyTypes.TEXT}
					title={vwap24Hr || '-'}
					weight='reg'
				/>
				<PercentBadge
					percent={changePercent}
					variant={parseFloat(changePercent) > 0 ? 'upper' : undefined}
				/>
			</div>
		</div>
	)
}
