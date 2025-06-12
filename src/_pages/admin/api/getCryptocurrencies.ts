export async function getCryptocurrencies() {
  const response = await fetch('/api/admin/cryptocurrencies')
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrencies')
  }
  return response.json()
} 