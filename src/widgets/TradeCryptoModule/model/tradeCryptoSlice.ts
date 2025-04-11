import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedCrypto {
	name: string
	price: string
	symbol: string
}

interface TradeCryptoModuleSlice {
	activeStep: number
	selectedCrypto: SelectedCrypto
}

const initialState = {
	activeStep: 1,
	selectedCrypto: {
		name: '',
		price: '',
		symbol: '',
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
						name: '',
						price: '',
						symbol: '',
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
	},
})

const tradeCryptoReducer = tradeCryptoSlice.reducer
export { tradeCryptoReducer as default }

export const { goBack, goNext, selectCrypto } = tradeCryptoSlice.actions
