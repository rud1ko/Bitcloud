import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentService } from '@/shared/api/commentService'

export const useComments = (cryptoId: string) => {
	const queryClient = useQueryClient()

	const { data: comments, isLoading } = useQuery({
		queryKey: ['comments', cryptoId],
		queryFn: () => CommentService.getComments(cryptoId)
	})

	const { mutate: createComment, isPending: isCreating } = useMutation({
		mutationFn: CommentService.createComment,
		onSuccess: (newComment) => {
			// Optimistically update the cache
			queryClient.setQueryData(['comments', cryptoId], (oldComments: any[]) => {
				return [newComment, ...(oldComments || [])]
			})
			// Then invalidate to ensure we have the latest data
			queryClient.invalidateQueries({ queryKey: ['comments', cryptoId] })
		},
		onError: (error) => {
			console.error('Failed to create comment:', error)
			// Revert optimistic update if needed
			queryClient.invalidateQueries({ queryKey: ['comments', cryptoId] })
		}
	})

	return {
		comments,
		isLoading,
		createComment,
		isCreating
	}
} 