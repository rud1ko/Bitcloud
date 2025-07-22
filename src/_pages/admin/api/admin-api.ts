async function getCryptocurrencies() {
  const response = await fetch('/api/admin/cryptocurrencies')
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrencies')
  }
  return response.json()
} 

async function getTransactions() {
  const response = await fetch('/api/admin/transactions')
  if (!response.ok) {
    throw new Error('Failed to fetch transactions')
  }
  return response.json()
} 

async function getUsers() {
  const response = await fetch('/api/admin/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
} 

export const ADMIN_API = {
	getCryptocurrencies,
	getTransactions,
	getUsers
}