import { signUp } from '@/globals/actions/signUp'
import { InputWithLabel } from '@/shared/InputWithLabel'
import { Button } from '@/shared/ui/button'

export const SignUpForm = () => {
	return (
		<form
			className='flex flex-col gap-[32px] mt-[32px] max-w-[380px] w-[100%]'
			action={signUp}
		>
			<InputWithLabel
				label='Email'
				placeholder='Email address'
				type='email'
				id='email'
			/>
			<InputWithLabel
				label='Name'
				placeholder='Nickname or firstname'
				type='text'
				id='name'
			/>
			<InputWithLabel
				label='Password'
				placeholder='Password'
				type='password'
				id='password'
			/>
			<Button variant={'primary'} type='submit'>
				Sign Up
			</Button>
		</form>
	)
}
