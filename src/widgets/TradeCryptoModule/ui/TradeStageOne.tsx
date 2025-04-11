'use client'
import { useAppDispatch } from '@/globals/redux/store'
import { valueRounder } from '@/globals/utils/valueRounder'
import { CryptoIcon } from '@/shared/CryptoIcon/ui/CryptoIcon'
import { Typography, TypographyTypes } from '@/shared/Typography'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import { Coin } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { selectCrypto } from '../model/tradeCryptoSlice'

export const TradeStageOne = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ['topCoins'],
		queryFn: (): Promise<Coin[]> =>
			fetch('http://localhost:3000//api/coins?limit=10&isRank=true').then(res =>
				res.json()
			),
	})
	const dispatch = useAppDispatch()

	const handleRowClick = (coin: Coin) => {
		dispatch(
			selectCrypto({
				name: coin.name,
				price: coin.priceUsd,
				symbol: coin.symbol,
			})
		)
	}

	if (isPending) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Table>
			<TableCaption>Top 10 Crypto</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Price</TableHead>
					<TableHead className='text-right'>24h %</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map(coin => (
					<TableRow
						key={coin.symbol}
						onClick={() => handleRowClick(coin)}
						className='cursor-pointer p-[16px_0] h-[65px]'
					>
						<TableCell className='font-medium'>{coin.rank}</TableCell>
						<TableCell className='flex items-center h-[64px] gap-1'>
							<CryptoIcon symbol={coin.symbol} />
							<Typography type={TypographyTypes.H6} title={coin.name} />
							<Typography
								type={TypographyTypes.H6}
								title={coin.symbol}
								weight='reg'
								color='gray'
							/>
						</TableCell>
						<TableCell>
							<Typography
								type={TypographyTypes.H6}
								title={`$${valueRounder(coin.priceUsd, 2)}`}
							/>
						</TableCell>
						<TableCell className='text-right'>
							<Typography
								type={TypographyTypes.H6}
								title={valueRounder(coin.changePercent24Hr, 2)}
								color={
									coin.changePercent24Hr[0] === '-' ? 'primary' : 'success'
								}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
