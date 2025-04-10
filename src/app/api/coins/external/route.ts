import { Coin } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.EXTERNAL_API_REST_URL}/assets`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_EXTERNAL_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			const errorText = await response.text()
			return Response.json(
				{ error: 'API Error', status: response.status, details: errorText },
				{ status: response.status }
			)
		}

		const result: Coin[] = await response.json()

		return Response.json(result)
	} catch (error) {
		return Response.json(
			{
				error: 'Internal Server Error',
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		)
	}
}
