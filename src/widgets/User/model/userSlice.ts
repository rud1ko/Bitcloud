import { createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './login.thunk'

interface UserState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
    balance: number
  } | null
  request: {
    status: 'pending' | 'success' | 'error' | null
    success: string | null
    error: string | null
  }
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  request: {
    status: null,
    success: null,
    error: null
  }
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
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        return {
          ...state,
          request: {
            status: 'pending',
            success: null,
            error: null
          }
        }
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          request: {
            status: 'success',
            success: action.payload.message,
            error: null
          }
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        return {
          ...state,
          request: {
            status: 'error',
            success: null,
            error: action.payload?.message || 'An error occurred'
          }
        }
      })
  }
})

export const { setUser, resetUserState } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer 