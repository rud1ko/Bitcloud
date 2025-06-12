import { NextResponse } from 'next/server'
import db from '@/globals/db/db'

export async function DELETE(
  request: Request,
  { params }: { params: { cryptocurrencyId: string } }
) {
  try {
    // Удаляем криптовалюту
    await db.coin.delete({
      where: {
        id: params.cryptocurrencyId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting cryptocurrency:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 