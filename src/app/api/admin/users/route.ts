import db from '@/globals/db/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        card: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 