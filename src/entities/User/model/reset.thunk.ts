import { signOut } from '@/app/_lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const resetThunk = createAsyncThunk('user/signOut', async () => {
    try {
        await signOut({ redirectTo: '/' }).then()
    } catch (error) {
        throw new Error("BLYAD")
    }
})