import db from '@/globals/db/db'

const getUserById = async (id: number) => {
	try {
		const user = await db.user.findUnique({ where: { id } })

		return user
	} catch (error) {
		return null
	}
}

export { getUserById }
