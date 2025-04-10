import { Nullable } from '@/shared/types/Nullable.type'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './login.thunk'

type ApplicationUser = {
	email: string
	name: string
	balance: number
}

type ApplicationUserRequestStatus = {
	success: Nullable<string>
	error: Nullable<string>
	status: 'pending' | 'success' | 'error' | null
}

type UserSlice = {
	user: Nullable<ApplicationUser>
	request: ApplicationUserRequestStatus
}

const initialState: UserSlice = {
	user: null,
	request: {
		// Инициализируем как объект
		status: null,
		success: null,
		error: null,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUserState: (state, action: PayloadAction<ApplicationUser>) => ({
			...state,
			user: action.payload,
		}),
		resetUserState() {
			return initialState
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginThunk.pending, state => {
				state.request = {
					status: 'pending',
					success: null,
					error: null,
				}
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.request = {
					status: 'success',
					success: action.payload.message,
					error: null,
				}
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.request = {
					status: 'error',
					success: null,
					error: (action.payload as { message: string }).message,
				}
			})
	},
})

const userReducer = userSlice.reducer

export const { changeUserState, resetUserState } = userSlice.actions
export { userReducer as default }
