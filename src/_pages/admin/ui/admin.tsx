'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CryptocurrenciesTable } from './tables/CryptocurrenciesTable'
import { TransactionsTable } from './tables/TransactionsTable'
import { UsersTable } from './tables/UsersTable'

interface User {
	id: string
	email: string
	name: string
	role: 'USER' | 'ADMIN'
	balance_BTC: number
	card: {
		balance: number
	}
}

interface Transaction {
	id: string
	userId: string
	amountUSD: number
	amountBTC: number
	type: 'BUY' | 'SELL'
	status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
	createdAt: string
	user: {
		email: string
		name: string
	}
}

interface Cryptocurrency {
	id: string
	name: string
	symbol: string
	price: number
	marketCap: number
	volume24h: number
}

export const AdminPage = () => {
	const { data: session } = useSession()
	const router = useRouter()

	// Проверяем, является ли пользователь админом
	useEffect(() => {
		if (session?.user?.role !== 'ADMIN') {
			router.push('/')
		}
	}, [session, router])

	// Получаем данные для таблиц
	const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
		queryKey: ['admin-users'],
		queryFn: () => fetch('/api/admin/users').then(res => res.json()),
	})

	const { data: transactions, isLoading: isLoadingTransactions } = useQuery<
		Transaction[]
	>({
		queryKey: ['admin-transactions'],
		queryFn: () => fetch('/api/admin/transactions').then(res => res.json()),
	})

	const { data: cryptocurrencies, isLoading: isLoadingCryptocurrencies } =
		useQuery<Cryptocurrency[]>({
			queryKey: ['admin-cryptocurrencies'],
			queryFn: () =>
				fetch('/api/admin/cryptocurrencies').then(res => res.json()),
		})

	if (session?.user?.role !== 'ADMIN') {
		return null
	}

	return (
		<div className='container mx-auto py-10'>
			<Card>
				<CardHeader>
					<CardTitle>Admin Dashboard</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='users' className='w-full'>
						<TabsList className='grid w-full grid-cols-3'>
							<TabsTrigger value='users'>Users</TabsTrigger>
							<TabsTrigger value='transactions'>Transactions</TabsTrigger>
							<TabsTrigger value='cryptocurrencies'>
								Cryptocurrencies
							</TabsTrigger>
						</TabsList>
						<TabsContent value='users'>
							<UsersTable />
						</TabsContent>
						<TabsContent value='transactions'>
							<TransactionsTable />
						</TabsContent>
						<TabsContent value='cryptocurrencies'>
							<CryptocurrenciesTable />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}
