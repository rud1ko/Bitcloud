export async function getTransactions() {
  const response = await fetch('/api/admin/transactions')
  if (!response.ok) {
    throw new Error('Failed to fetch transactions')
  }
  return response.json()
} 