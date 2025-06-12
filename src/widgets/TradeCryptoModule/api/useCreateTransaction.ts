import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransactionService } from '@/shared/api/transactionService'

interface CreateTransactionData {
	userId: string
	amountUSD: number
	amountBTC: number
	serviceFee: number
}

export const useCreateTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateTransactionData) => TransactionService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})
} 