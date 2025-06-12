import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
  } | null
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    resetUserState: (state) => {
      state.isAuthenticated = false
      state.user = null
    }
  }
})

export const { setUser, resetUserState } = userSlice.actions
export default userSlice.reducer 