interface CreateTransactionData {
	userId: string
	amountUSD: number
	amountBTC: number
	serviceFee: number
}

export const TransactionService = {
	create: async (data: CreateTransactionData) => {
		const response = await fetch('/api/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error('Failed to create transaction')
		}

		return response.json()
	},
} 