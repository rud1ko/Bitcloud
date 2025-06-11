import { GoogleButton } from '@/entities/SignInForm/ui/GoogleButton'
import { SignInForm } from '@/entities/SignInForm/ui/SignInForm'
import { Typography, TypographyTypes } from '@/shared/Typography'
import Link from 'next/link'

const SignInPage = () => {
	return (
		<>
			<div className='flex absolute top-[56px] right-[64px]'>
				<Typography title='Don’t have an account?' type={TypographyTypes.H6} />
				<Link href={'/signUp'} className='ml-[5px]'>
					<Typography
						title='Sign up for free
'
						type={TypographyTypes.H6}
						color='primary'
					/>
				</Link>
			</div>
			<div className='flex flex-col items-center p-[124px_48px_76px]'>
				<Typography title='Sign in' type={TypographyTypes.H2} />
				<div className='max-w-[380px] w-full'>
					<GoogleButton />
				</div>
				<SignInForm />
			</div>
		</>
	)
}

export { SignInPage }
