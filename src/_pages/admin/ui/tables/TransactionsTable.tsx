'use client'

import { Button } from '@/shared/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { ADMIN_API } from '../../api'
import { useDeleteTransaction } from '../../api/useDeleteTransaction'

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

export function TransactionsTable() {
	const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
		null
	)
	const queryClient = useQueryClient()
	const { mutate: deleteTransaction } = useDeleteTransaction()

	const { data: transactions = [], isLoading } = useQuery<Transaction[]>({
		queryKey: ['transactions'],
		queryFn: ADMIN_API.getTransactions,
	})

	const handleDelete = (id: string) => {
		setSelectedTransaction(id)
		deleteTransaction(id, {
			onSuccess: () => {
				setSelectedTransaction(null)
				queryClient.invalidateQueries({ queryKey: ['transactions'] })
				toast.success('Transaction deleted and funds returned to user')
			},
			onError: () => {
				toast.error('Failed to delete transaction')
			},
		})
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>User</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Amount USD</TableHead>
						<TableHead>Amount BTC</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions.map(transaction => (
						<TableRow key={transaction.id}>
							<TableCell>
								{format(new Date(transaction.createdAt), 'dd.MM.yyyy HH:mm')}
							</TableCell>
							<TableCell>
								<div>
									<div>{transaction.user.name}</div>
									<div className='text-sm text-muted-foreground'>
										{transaction.user.email}
									</div>
								</div>
							</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
										transaction.type === 'BUY'
											? 'bg-green-100 text-green-700'
											: 'bg-red-100 text-red-700'
									}`}
								>
									{transaction.type}
								</span>
							</TableCell>
							<TableCell>${transaction.amountUSD.toFixed(2)}</TableCell>
							<TableCell>{transaction.amountBTC.toFixed(8)} BTC</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
										transaction.status === 'COMPLETED'
											? 'bg-green-100 text-green-700'
											: transaction.status === 'PENDING'
											? 'bg-yellow-100 text-yellow-700'
											: 'bg-red-100 text-red-700'
									}`}
								>
									{transaction.status}
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<Button
									variant='destructive'
									size='sm'
									onClick={() => handleDelete(transaction.id)}
									disabled={selectedTransaction === transaction.id}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
