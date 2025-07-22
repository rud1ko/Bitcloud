import { login } from '@/entities/User/actions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthorizedUserSchema, AuthorizedUserType } from '@/entities/User/lib/schema'
import { signIn } from 'next-auth/react'

interface LoginResponse {
  user: {
    email: string
    name: string
    balance: number
  }
  message: string
}

export const loginThunk = createAsyncThunk<LoginResponse, AuthorizedUserType, { rejectValue: { message: string } }>(
  'user/login',
  async (values: AuthorizedUserType, { rejectWithValue }) => {
    const validatedParams = AuthorizedUserSchema.safeParse(values)

    if (!validatedParams.success) {
      return rejectWithValue({
        message: 'Invalid fields',
      })
    }

    try {
      const res = await login(values)

      if (!res.success) {
        return rejectWithValue({
          message: res.error || 'Authentication failed',
        })
      }

      if (!res.user) {
        return rejectWithValue({
          message: 'User not found',
        })
      }

      // Выполняем вход через NextAuth
      const signInResult = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (!signInResult?.ok) {
        return rejectWithValue({
          message: 'Failed to create session',
        })
      }

      return {
        user: {
          email: res.user.email,
          name: res.user.name,
          balance: res.user.balance_BTC,
        },
        message: 'Signed in successfully',
      }
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
) 