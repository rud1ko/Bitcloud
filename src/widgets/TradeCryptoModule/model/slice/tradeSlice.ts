import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TradeState {
	amount: number
	cryptoAmount: number
	cryptoType: string
	stage: number
}

const initialState: TradeState = {
	amount: 0,
	cryptoAmount: 0,
	cryptoType: 'BTC',
	stage: 1,
}

const tradeSlice = createSlice({
	name: 'trade',
	initialState,
	reducers: {
		setAmount: (state, action: PayloadAction<number>) => {
			state.amount = action.payload
		},
		setCryptoAmount: (state, action: PayloadAction<number>) => {
			state.cryptoAmount = action.payload
		},
		setCryptoType: (state, action: PayloadAction<string>) => {
			state.cryptoType = action.payload
		},
		setStage: (state, action: PayloadAction<number>) => {
			state.stage = action.payload
		},
		resetTradeState: (state) => {
			state.amount = 0
			state.cryptoAmount = 0
			state.cryptoType = 'BTC'
			state.stage = 1
		},
	},
})

export const {
	setAmount,
	setCryptoAmount,
	setCryptoType,
	setStage,
	resetTradeState,
} = tradeSlice.actions

export default tradeSlice.reducer 