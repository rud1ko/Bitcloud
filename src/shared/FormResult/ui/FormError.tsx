import { Typography, TypographyTypes } from '@/shared/Typography'
import { CircleX } from 'lucide-react'
import { FormResultProps } from '../model/FormResult.type'

export const FormError: React.FC<FormResultProps> = ({ message }) => {
	if (!message) return null

	return (
		<div className='flex items-center gap-x-2 bg-red-200 rounded-sm p-[5px_20px]'>
			<CircleX color='red' />
			<Typography
				type={TypographyTypes.H6}
				title={message}
				color='primary'
				weight='bold'
			/>
		</div>
	)
}
