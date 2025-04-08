import { Typography, TypographyTypes } from '@/shared/Typography'
import { CircleCheck } from 'lucide-react'
import { FormResultProps } from '../model/FormResult.type'

export const FormSuccess: React.FC<FormResultProps> = ({ message }) => {
	if (!message) return null

	return (
		<div className='flex items-center gap-x-2 bg-green-200 rounded-sm p-[5px_20px]'>
			<CircleCheck color='green' />
			<Typography
				type={TypographyTypes.H6}
				title={message}
				color='success'
				weight='bold'
			/>
		</div>
	)
}
