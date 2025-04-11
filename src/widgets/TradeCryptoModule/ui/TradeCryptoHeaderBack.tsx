'use client'
import { useAppDispatch } from '@/globals/redux/store'
import { CryptoIcon } from '@/shared/CryptoIcon/ui/CryptoIcon'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import backBtn from '../../../../public/back.svg'
import { goBack } from '../model/tradeCryptoSlice'

interface TradeCryptoHeaderBack {
	cryptoName: string
	title: string
	symbol: string
}

export const TradeCryptoHeaderBack: React.FC<TradeCryptoHeaderBack> = ({
	cryptoName,
	title,
	symbol,
}) => {
	const dispatch = useAppDispatch()

	return (
		<div className='flex justify-between items-center'>
			<Button variant={'ghost'} onClick={() => dispatch(goBack())}>
				<Image src={backBtn} alt='Back Button' />
				<Typography
					type={TypographyTypes.H4}
					title={title}
					className='ml-[6px]'
				/>
			</Button>
			<div className='flex items-center'>
				<Typography type={TypographyTypes.H6} title={`Buying ${cryptoName}`} className='mr-[10px]' />
				<CryptoIcon symbol={symbol} />
			</div>
		</div>
	)
}
