'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { QueryProvider } from './query-provider'
import store from '../_lib/store'

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<QueryProvider>
				<SessionProvider>{children}</SessionProvider>
			</QueryProvider>
		</Provider>
	)
}
