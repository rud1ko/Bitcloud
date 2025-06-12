import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedCrypto {
	id: string
	name: string
	price: string
	symbol: string
}

interface EnterAmount {
	pay: string
	receive: string
}

interface TradeCryptoModuleSlice {
	activeStep: number
	selectedCrypto: SelectedCrypto
	enterAmount: EnterAmount
}

const initialState = {
	activeStep: 1,
	selectedCrypto: {
		id: '',
		name: '',
		price: '',
		symbol: ''
	},
	enterAmount: {
		pay: '',
		receive: ''
	},
} as TradeCryptoModuleSlice

export const tradeCryptoSlice = createSlice({
	name: 'tradeCryptoSlice',
	initialState,
	reducers: {
		goBack: state => {
			const { activeStep } = state
			if (activeStep === 2) {
				return {
					...state,
					selectedCrypto: {
						id: '',
						name: '',
						price: '',
						symbol: '',
					},
					activeStep: state.activeStep - 1,
				}
			} else if (activeStep === 3) {
				return {
					...state,
					enterAmount: {
						pay: '',
						receive: '',
					},
					activeStep: state.activeStep - 1,
				}
			}
			return { ...state, activeStep: state.activeStep - 1 }
		},
		goNext: state => ({ ...state, activeStep: state.activeStep + 1 }),
		selectCrypto: (state, action: PayloadAction<SelectedCrypto>) => ({
			...state,
			selectedCrypto: { ...action.payload },
			activeStep: state.activeStep + 1,
		}),
		enterAmount: (state, action: PayloadAction<EnterAmount>) => ({
			...state,
			enterAmount: { ...action.payload },
			activeStep: state.activeStep + 1,
		}),
		resetTradeState: () => ({
			...initialState
		})
	},
})

const tradeCryptoReducer = tradeCryptoSlice.reducer
export { tradeCryptoReducer as default }

export const { goBack, goNext, selectCrypto, enterAmount, resetTradeState } =
	tradeCryptoSlice.actions
