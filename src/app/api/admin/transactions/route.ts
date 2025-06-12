import { NextResponse } from 'next/server'
import db from '@/globals/db/db'

export async function GET() {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 