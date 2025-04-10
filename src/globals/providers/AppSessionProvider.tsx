'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persister, store } from '../redux/store'

export const AppSessionProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<SessionProvider>{children}</SessionProvider>
			</PersistGate>
		</Provider>
	)
}
