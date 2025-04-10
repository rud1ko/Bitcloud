// authThunks.ts
import { login } from '@/globals/actions/login'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserByEmail } from '../api/getUserByEmail'
import { AuthorizedUserSchema, AuthorizedUserType } from '../lib/schema'

export const loginThunk = createAsyncThunk(
	'user/login',
	async (values: AuthorizedUserType, { rejectWithValue }) => {
		const validatedParams = AuthorizedUserSchema.safeParse(values)

		if (!validatedParams.success) {
            console.log("HUY")
			return rejectWithValue({
				message: 'Invalid fields',
			})
		}

		const { email, password } = validatedParams.data

		console.log('Email:', email, 'Password:', password)

		try {
			const res = await login(values)

            console.log(res.success)

			if (!res.success) {
				return rejectWithValue({
					message: res.error,
				})
			}

            console.log("Email", email)
			console.log('user', res.user)

			if (!res.user) {
				return rejectWithValue({
					message: 'User not found',
				})
			}

			console.log('Holla')
			return {
				user: {
					email: res.user.email,
					name: res.user.name,
					balance: res.user.balance,
				},
				message: res.success,
			}
		} catch (error) {
			console.log('SUKA')
			return rejectWithValue({
				message: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}
)
