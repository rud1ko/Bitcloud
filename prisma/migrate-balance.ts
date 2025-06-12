import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateBalances() {
  try {
    // Получаем всех пользователей с балансом
    const users = await prisma.user.findMany({
      where: {
        balance: {
          not: 0
        }
      }
    })

    // Для каждого пользователя обновляем баланс его карты
    for (const user of users) {
      const card = await prisma.card.findUnique({
        where: {
          userId: user.id
        }
      })

      if (card) {
        await prisma.card.update({
          where: {
            id: card.id
          },
          data: {
            balance: user.balance
          }
        })
      }
    }

    console.log('Balances migrated successfully')
  } catch (error) {
    console.error('Error migrating balances:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateBalances() 