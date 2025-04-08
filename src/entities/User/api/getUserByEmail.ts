import db from '@/globals/db/db'

const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } })

		return user
	} catch (error) {
		return null
	}
}

export { getUserByEmail }
