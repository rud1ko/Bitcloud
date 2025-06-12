import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteCryptocurrency() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (cryptocurrencyId: string) => {
      const response = await fetch(
        `/api/admin/cryptocurrencies/${cryptocurrencyId}`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cryptocurrencies'] })
      toast.success('Cryptocurrency deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete cryptocurrency')
    },
  })
} 