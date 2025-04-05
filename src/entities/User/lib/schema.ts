import { z } from 'zod'

const AuthorizedUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

type Schema = z.infer<typeof AuthorizedUserSchema>

export { AuthorizedUserSchema, type Schema }
