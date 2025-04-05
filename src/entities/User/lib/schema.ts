import { z } from 'zod'

const AuthorizedUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

const NonAuthorizedUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
	name: z.string().refine(value => /^[A-Z]/.test(value), {
		message: 'Имя должно начинаться с большой буквы',
	}),
})

type Schema = z.infer<typeof AuthorizedUserSchema>

export { AuthorizedUserSchema, NonAuthorizedUserSchema,  type Schema }
