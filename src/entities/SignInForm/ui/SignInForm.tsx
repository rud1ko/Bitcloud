import { InputWithLabel } from '@/shared/InputWithLabel'
import { Button } from '@/shared/ui/button'

export const SignInForm = () => {
	return (
		<form className='flex flex-col gap-[32px] mt-[32px] max-w-[380px] w-[100%]'>
			<InputWithLabel
				label='Email'
				placeholder='Email address'
				type='email'
				id='email'
			/>
			<InputWithLabel
				label='Password'
				placeholder='Password'
				type='password'
				id='password'
			/>
			<Button variant={'primary'}>Sign In</Button>
		</form>
	)
}
