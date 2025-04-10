'use client'
import { useEffect, useRef, useState } from 'react'

interface GetWebsocketParams {
	pathname: string
}

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'

type CryptoPriceResponse = {
	[key: string]: string
}

export const useGetWebsocket = ({ pathname }: GetWebsocketParams) => {
	const [connectionStatus, setConnectionStatus] =
		useState<ConnectionStatus>('connecting')
	const [message, setMessage] = useState<CryptoPriceResponse | null>(null)
	const wsRef = useRef<WebSocket | null>(null)
	const latestMessageRef = useRef<CryptoPriceResponse | null>(null)
	const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const connectWebSocket = () => {
			const ws = new WebSocket(
				`${process.env.NEXT_PUBLIC_EXTERNAL_API_WEBSOCKET_URL}/${pathname}${process.env.NEXT_PUBLIC_EXTERNAL_API_KEY}`
			)
			wsRef.current = ws

			ws.onopen = () => {
				setConnectionStatus('connected')
				startUpdateInterval()
			}

			ws.onclose = () => {
				setConnectionStatus('disconnected')
				if (updateIntervalRef.current) {
					clearInterval(updateIntervalRef.current)
				}
				setTimeout(connectWebSocket, 5000)
			}

			ws.onmessage = event => {
				try {
					const data = JSON.parse(event.data)
					latestMessageRef.current = data // Сохраняем последнее сообщение
				} catch (error) {
					console.error('Error parsing WebSocket message:', error)
				}
			}
		}

		const startUpdateInterval = () => {
			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current)
			}

			updateIntervalRef.current = setInterval(() => {
				if (latestMessageRef.current) {
					setMessage({ ...latestMessageRef.current })
				}
			}, 3000)
		}

		connectWebSocket()

		return () => {
			if (wsRef.current) {
				wsRef.current.close()
			}

			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current)
			}
		}
	}, [pathname])

	return { message, connectionStatus }
}
