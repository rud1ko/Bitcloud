import { NextResponse } from 'next/server'
import db from '@/globals/db/db'
import { auth } from '@/globals/config/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        card: true
      }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('[USER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 