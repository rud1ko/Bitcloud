import { auth, db } from '@/app/_lib'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const cryptoId = searchParams.get('cryptoId')

		if (!cryptoId) {
			return new NextResponse('Crypto ID is required', { status: 400 })
		}

		const comments = await db.comment.findMany({
			where: { cryptoId },
			include: {
				user: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(comments)
	} catch (error) {
		console.error('[COMMENTS_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		console.log('[COMMENTS_POST] Starting comment creation...')

		const session = await auth()
		console.log('[COMMENTS_POST] Session:', session)

		if (!session?.user) {
			console.log('[COMMENTS_POST] No user session found')
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		console.log('[COMMENTS_POST] Request body:', body)

		const { content, cryptoId } = body

		if (!content || !cryptoId) {
			console.log('[COMMENTS_POST] Missing required fields:', {
				content,
				cryptoId,
			})
			return new NextResponse('Content and cryptoId are required', {
				status: 400,
			})
		}

		// Check if the coin exists
		const coin = await db.coin.findUnique({
			where: { id: cryptoId },
		})

		if (!coin) {
			console.log('[COMMENTS_POST] Coin not found:', cryptoId)
			return new NextResponse('Coin not found', { status: 404 })
		}

		console.log('[COMMENTS_POST] Creating comment with data:', {
			userId: session.user.id,
			cryptoId,
			content,
		})

		const comment = await db.comment.create({
			data: {
				userId: session.user.id,
				cryptoId,
				content,
			},
			include: {
				user: {
					select: {
						name: true,
					},
				},
			},
		})

		console.log('[COMMENTS_POST] Comment created successfully:', comment)
		return NextResponse.json(comment)
	} catch (error) {
		console.error('[COMMENTS_POST] Error details:', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
