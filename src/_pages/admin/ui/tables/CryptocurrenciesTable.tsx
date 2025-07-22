'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { useDeleteCryptocurrency } from '../../api/useDeleteCryptocurrency'
import { useQuery } from '@tanstack/react-query'
import { ADMIN_API } from '../../api'

interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  priceUsd: string
  marketCapUsd: string
  volumeUsd24Hr: string
  changePercent24Hr: string
}

export function CryptocurrenciesTable() {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const { mutate: deleteCryptocurrency } = useDeleteCryptocurrency()

  const { data: cryptocurrencies = [], isLoading } = useQuery<Cryptocurrency[]>({
    queryKey: ['cryptocurrencies'],
    queryFn: ADMIN_API.getCryptocurrencies,
  })

  const handleDelete = (id: string) => {
    setSelectedCrypto(id)
    deleteCryptocurrency(id, {
      onSuccess: () => {
        setSelectedCrypto(null)
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead>Change (24h)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptocurrencies.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.name}</TableCell>
              <TableCell>{crypto.symbol}</TableCell>
              <TableCell>${Number(crypto.priceUsd).toFixed(2)}</TableCell>
              <TableCell>${Number(crypto.marketCapUsd).toLocaleString()}</TableCell>
              <TableCell>${Number(crypto.volumeUsd24Hr).toLocaleString()}</TableCell>
              <TableCell
                className={
                  Number(crypto.changePercent24Hr) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {Number(crypto.changePercent24Hr).toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(crypto.id)}
                  disabled={selectedCrypto === crypto.id}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 