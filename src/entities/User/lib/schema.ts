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
})

type AuthorizedUserType = z.infer<typeof AuthorizedUserSchema>
type NonAuthorizedUserType = z.infer<typeof NonAuthorizedUserSchema>

export {
	AuthorizedUserSchema,
	NonAuthorizedUserSchema,
	type AuthorizedUserType,
	type NonAuthorizedUserType,
}
