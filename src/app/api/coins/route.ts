import db from '@/globals/db/db'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const limit = searchParams.get('limit')
		? parseInt(searchParams.get('limit')!)
		: 0
	const isSortedByRank = searchParams.get('isRank')

	let coins = await db.coin.findMany()

	if (isSortedByRank === 'true') {
		coins.sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
	}

	if (limit) {
		coins = coins.slice(0, limit)
	}

	return Response.json(coins)
}
