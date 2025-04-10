import { signOut } from '@/globals/config/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const resetThunk = createAsyncThunk('user/signOut', async () => {
    try {
        await signOut({ redirectTo: '/' }).then()
    } catch (error) {
        throw new Error("BLYAD")
    }
})