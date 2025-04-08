import { ResetForm } from '@/entities/ResetForm'
import { Typography, TypographyTypes } from '@/shared/Typography'

const ForgotPasswordPage = () => {
	return (
		<div className='flex flex-col items-center p-[124px_48px_76px]'>
			<Typography title='Forgot your password?' type={TypographyTypes.H2} />
			<ResetForm />
		</div>
	)
}

export { ForgotPasswordPage }
