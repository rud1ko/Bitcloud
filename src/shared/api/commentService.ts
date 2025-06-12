export interface Comment {
	id: string
	content: string
	createdAt: string
	user: {
		name: string
	}
}

export const CommentService = {
	getComments: async (cryptoId: string): Promise<Comment[]> => {
		const response = await fetch(`/api/comments?cryptoId=${cryptoId}`)
		if (!response.ok) {
			throw new Error('Failed to fetch comments')
		}
		return response.json()
	},

	createComment: async (data: { content: string; cryptoId: string }): Promise<Comment> => {
		const response = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error('Failed to create comment')
		}
		return response.json()
	},
} 