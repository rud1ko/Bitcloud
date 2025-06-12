'use client'

import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'
import { format } from 'date-fns'
import { valueRounder } from '@/globals/utils/valueRounder'
import { Skeleton } from '@/shared/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { useAppDispatch } from '@/globals/redux/store'
import { resetUserState } from '@/widgets/User/model/userSlice'

interface UserData {
  name: string
  email: string
  balance_BTC: number
  card: {
    cardNumber: string
    cardHolder: string
    expirationDate: string
    balance: number
  }
}

interface Transaction {
  id: string
  amountUSD: number
  amountBTC: number
  serviceFee: number
  createdAt: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()

  const { data: userData, isLoading: isLoadingUser } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: () => fetch('/api/user').then(res => res.json()),
    enabled: !!session?.user
  })

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => fetch('/api/transactions').then(res => res.json()),
    enabled: !!session?.user
  })

  const handleSignOut = async () => {
		dispatch(resetUserState())
		await signOut({ redirect: true, callbackUrl: '/' })
	}

  if (!session?.user) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Please sign in to view your profile</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://avatar.vercel.sh/${session.user.email}`} />
                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{session.user.name}</CardTitle>
                <CardDescription>{session.user.email}</CardDescription>
              </div>
            </div>
            <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">BTC Balance</span>
                <span className="font-medium">{isLoadingUser ? <Skeleton className="h-4 w-20" /> : `${valueRounder(userData?.balance_BTC || 0, 8)} BTC`}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Info */}
        <Card>
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingUser ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : userData?.card ? (
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Card Number</span>
                  <span className="font-medium">**** **** **** {userData.card.cardNumber.slice(-4)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Card Holder</span>
                  <span className="font-medium">{userData.card.cardHolder}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expiration Date</span>
                  <span className="font-medium">{userData.card.expirationDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-medium">${valueRounder(userData.card.balance, 2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No card information available</p>
            )}
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTransactions ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Transaction #{transaction.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(transaction.createdAt), 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Amount (USD)</span>
                        <span className="font-medium">${valueRounder(transaction.amountUSD, 2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Amount (BTC)</span>
                        <span className="font-medium">{valueRounder(transaction.amountBTC, 8)} BTC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span className="font-medium">{valueRounder(transaction.serviceFee, 8)} BTC</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No transactions found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 