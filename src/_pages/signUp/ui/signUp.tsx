import { SignUpForm } from '@/entities/SignUpForm'
import { Typography, TypographyTypes } from '@/shared/Typography'
import Link from 'next/link'

const SignUpPage = () => {
	return (
		<>
			<div className='flex absolute top-[56px] right-[64px]'>
				<Typography
					title='Already have an account?'
					type={TypographyTypes.H6}
				/>
				<Link href={'/signIn'} className='ml-[5px]'>
					<Typography title='Login' type={TypographyTypes.H6} color='primary' />
				</Link>
			</div>
			<div className='flex flex-col items-center p-[124px_48px_76px]'>
				<Typography title='Sign up' type={TypographyTypes.H2} />
				<SignUpForm />
			</div>
		</>
	)
}

export { SignUpPage }
