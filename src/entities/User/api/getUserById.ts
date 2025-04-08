import db from '@/globals/db/db'

const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } })

		return user
	} catch (error) {
		return null
	}
}

export { getUserById }
