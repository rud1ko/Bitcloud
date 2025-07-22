import { db } from '@/app/_lib'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cryptocurrencies = await db.coin.findMany()
    return NextResponse.json(cryptocurrencies)
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 