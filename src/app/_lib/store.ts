import tradeCryptoReducer from '@/widgets/TradeCryptoModule/model/tradeCryptoSlice'
import userReducer from '@/widgets/User/model/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	user: userReducer,
	trade: tradeCryptoReducer,
})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
