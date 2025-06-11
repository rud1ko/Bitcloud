import { Typography, TypographyTypes } from '@/shared/Typography'
import { cva } from 'class-variance-authority'
import { Wallet } from 'lucide-react'
import { PaymentCategoryProps } from '../model/PaymentCategory.type'

export const paymentCategoryVariants = cva(
	'w-[40px] h-[40px] p-[10px] rounded-[50%]',
	{
		variants: {
			color: {
				green: 'bg-success',
				red: 'bg-destructive',
				blue: 'bg-primary-custom',
			},
		},
	}
)

export const PaymentCategory: React.FC<PaymentCategoryProps> = ({
	category,
	title,
	color,
}) => {
	return (
		<div className='flex'>
			<div className={paymentCategoryVariants({ color })}>
				<Wallet width={20} height={20} color='white' />
			</div>
			<div className='ml-[10px]'>
				<Typography type={TypographyTypes.TEXT} title={category} weight='reg' color='gray' />
                <Typography type={TypographyTypes.H6} title={title} weight='bold'/>
			</div>
		</div>
	)
}
