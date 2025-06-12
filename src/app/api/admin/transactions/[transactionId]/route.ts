import { NextResponse } from 'next/server'
import db from '@/globals/db/db'

export async function DELETE(
  request: Request,
  { params }: { params: { transactionId: string } }
) {
  try {
    // Получаем транзакцию для возврата средств
    const transaction = await db.transaction.findUnique({
      where: {
        id: params.transactionId,
      },
      include: {
        user: {
          include: {
            card: true,
          },
        },
      },
    })

    if (!transaction) {
      return new NextResponse('Transaction not found', { status: 404 })
    }

    if (!transaction.user?.card) {
      return new NextResponse('User card not found', { status: 404 })
    }

    // Возвращаем средства на карту пользователя
    await db.card.update({
      where: {
        id: transaction.user.card.id,
      },
      data: {
        balance: {
          increment: transaction.amountUSD,
        },
      },
    })

    // Возвращаем BTC на баланс пользователя
    await db.user.update({
      where: {
        id: transaction.userId,
      },
      data: {
        balance_BTC: {
          increment: transaction.amountBTC,
        },
      },
    })

    // Удаляем транзакцию
    await db.transaction.delete({
      where: {
        id: params.transactionId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 