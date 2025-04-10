'use client'

import { useAppSelector } from '@/globals/redux/store'

export const WebSocketSample = () => {
	const user = useAppSelector(state => state.user)

	return (
		<div>
			<h1>WebSocket</h1>
			<div>{JSON.stringify(user)}</div>
		</div>
	)
}
