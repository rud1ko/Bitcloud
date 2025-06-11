"use client"
import { useAppSelector } from '@/globals/redux/store'
import { PaymentCategory } from '@/shared/PaymentCategory'
import { Typography, TypographyTypes } from '@/shared/Typography'
import visa from "../../../../public/card/visa.svg"
import masterCard from "../../../../public/card/master-card.svg"
import Image from 'next/image'
import { CardForm } from '@/widgets/CardForm'

export const TradeStageThree = () => {
	const {
		enterAmount: { pay, receive },
		selectedCrypto: { symbol },
	} = useAppSelector(state => state.trade)

	return (
		<>
			<div className='flex justify-between items-center p-[24px_36px] bg-payment-category rounded-[16px]'>
				<PaymentCategory category='Spend' title={`$ ${pay}`} color={'green'} />
				<PaymentCategory
					category='Get'
					title={`${receive} ${symbol}`}
					color={'red'}
				/>
			</div>
            <div className='mt-[48px]'>
                <div className='flex items-center justify-between mb-[40px]'>
                    <Typography type={TypographyTypes.H4} title='Credit Card' />
                    <div className='flex'>
                        <Image src={visa} alt='Visa' />
                        <Image src={masterCard} alt='MasterCard>' />
                    </div>
                </div>
                <CardForm />
            </div>
		</>
	)
}
