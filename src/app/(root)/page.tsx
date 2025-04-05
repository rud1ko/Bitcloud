import { authOptions } from '@/globals/config/auth'
import { cn } from '@/globals/css/lib/css'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button, buttonVariants } from '@/shared/ui/button'
import { TopCoins } from '@/widgets/TopCoins'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import moneyLogo from '../../../public/Money_landing.png'

export default async function Home() {
	const session = await getServerSession(authOptions)

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

			<Button variant={'default'}>Hello</Button>
			<Button variant={'head'}>Hello</Button>
			<Button variant='destructive'>Hello</Button>
			<Button variant='secondary'>Hello</Button>
			<Button variant='default'>Hello</Button>
			<Button variant='primary'>Buy Crypto</Button>
			<Button variant='outline'>Sell Crypto</Button>

			<Typography type={TypographyTypes.H1} title='HomePage' />
			<Typography type={TypographyTypes.H2} title='HomePage' color='black' />
			<Typography type={TypographyTypes.H3} title='HomePage' color='ghost' />
			<Typography type={TypographyTypes.H4} title='HomePage' color='blur2' />
			<Typography type={TypographyTypes.H5} title='HomePage' color='primary' />
			<Typography
				type={TypographyTypes.H6}
				title='HomePage'
				color='secondary'
				weight='mid'
			/>
			<Typography type={TypographyTypes.TEXT} title='HomePage' />
			{session?.user?.name}
		</div>
	)
}
