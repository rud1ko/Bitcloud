import { auth } from '@/globals/config/auth'
import { cn } from '@/globals/css/lib/css'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { buttonVariants } from '@/shared/ui/button'
import { TopCoins } from '@/widgets/TopCoins'
import { WebSocketSample } from '@/widgets/WebsoketSample'
import Image from 'next/image'
import Link from 'next/link'
import moneyLogo from '../../../public/Money_landing.png'

export default async function Home() {
	const session = await auth()
	// const coins = await updateAllCoins()

	// console.log('Coins', coins.length)

	return (
		<div className='max-w-[1064px] m-[0_auto]'>
			<section className='flex mt-[43px]'>
				<div className='max-w-[564px] w-[100%] mt-[25px]'>
					<Typography
						type={TypographyTypes.H1}
						title='Learn, Buy & Sell Crypto Easily'
					/>
					<Typography
						type={TypographyTypes.H6}
						title='Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange.'
						weight='mid'
						className='mt-[16px]'
					/>
					<Link
						href={session?.user ? '/buyAndSell' : '/signIn'}
						className={cn(buttonVariants({ variant: 'primary' }), 'mt-[25px]')}
					>
						Get Started Now
					</Link>
				</div>
				<div className='ml-[64px]'>
					<Image src={moneyLogo} quality={100} priority alt='money rain' />
				</div>
			</section>
			<section className='mt-[38px]'>
				<TopCoins />
			</section>
		</div>
	)
}
