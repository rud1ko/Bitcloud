import { createSlice } from '@reduxjs/toolkit'

interface TradeCryptoModuleSlice {
    step: number
}

const initialState = {
    step: 1
} as TradeCryptoModuleSlice

export const tradeCryptoSlice = createSlice({
    name: "tradeCryptoSlice",
    initialState,
    reducers: {}
})