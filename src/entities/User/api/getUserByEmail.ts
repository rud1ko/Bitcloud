import { db } from '@/app/_lib'

const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } })

		console.log("User", user)

		return user
	} catch (error) {
		throw new Error("Not User")
	}
}

export { getUserByEmail }
