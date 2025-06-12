import { z } from 'zod'

const AuthorizedUserSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
})

const NonAuthorizedUserSchema = z.object({
	email: z.string().email({ message: 'Email is required' }),
	password: z.string().min(1, { message: 'Minimum 1 character' }),
	name: z.string().refine(value => /^[A-Z]/.test(value), {
		message: 'Имя должно начинаться с большой буквы',
	}),
	cardNumber: z.string()
		.refine(value => value.replace(/\s/g, '').length === 16, {
			message: 'Card number must be 16 digits'
		})
		.refine(value => /^[\d\s]+$/.test(value), {
			message: 'Card number must contain only digits and spaces'
		}),
	cardHolder: z.string()
		.min(3, { message: 'Card holder name is too short' })
		.regex(/^[A-Za-z\s]+$/, { message: 'Card holder name must contain only letters' }),
	expirationDate: z.string()
		.regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: 'Invalid expiration date format (MM/YY)' }),
	cvc: z.string()
		.min(3, { message: 'CVC must be 3 digits' })
		.max(3, { message: 'CVC must be 3 digits' })
		.regex(/^\d+$/, { message: 'CVC must contain only digits' }),
})

const ResetPasswordSchema = z.object({
	email: z.string().email({ message: 'Email is required' }),
	password: z.string().min(1, { message: 'Minimum 1 character' }),
	confirmPassword: z.string().min(1, { message: 'Minimum 1 character' }),
})

type AuthorizedUserType = z.infer<typeof AuthorizedUserSchema>
type NonAuthorizedUserType = z.infer<typeof NonAuthorizedUserSchema>
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>

export {
	AuthorizedUserSchema,
	NonAuthorizedUserSchema,
	ResetPasswordSchema,
	type AuthorizedUserType,
	type NonAuthorizedUserType,
	type ResetPasswordType,
}
