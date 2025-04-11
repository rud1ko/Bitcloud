'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persister, store } from '../redux/store'

const queryClient = new QueryClient()

export const AppSessionProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>{children}</SessionProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
