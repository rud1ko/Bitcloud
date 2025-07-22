import { NextResponse } from 'next/server'
import { db } from '@/app/_lib'

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()
    const { role, btcBalance } = body

    const updatedUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        role,
        balance_BTC: btcBalance,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Удаляем связанные транзакции
    await db.transaction.deleteMany({
      where: {
        userId: params.userId,
      },
    })

    // Удаляем карту пользователя
    await db.card.deleteMany({
      where: {
        userId: params.userId,
      },
    })

    // Удаляем пользователя
    await db.user.delete({
      where: {
        id: params.userId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 