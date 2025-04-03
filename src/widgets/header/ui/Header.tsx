import { Typography, TypographyTypes } from '@/shared/Typography'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logo-light.svg'

export const Header = () => {
	return (
		<header className={'flex items-center justify-between p-[30px_78px]'}>
			<div className='flex items-center'>
				<div>
					<Link href={'/'}>
						<Image src={logo} alt='light-logo' unoptimized />
					</Link>
				</div>
				<nav className='ml-[64px]'>
					<ul className='flex'>
						<li>
							<Typography
								title='Buy & Sell'
								type={TypographyTypes.H6}
								weight='mid'
							/>
						</li>
						<li className='ml-[24px]'>
							<Typography
								title='Markets'
								type={TypographyTypes.H6}
								weight='mid'
							/>
						</li>
						<li className='ml-[24px]'>
							<Typography
								title='Blogs'
								type={TypographyTypes.H6}
								weight='mid'
							/>
						</li>
						<li className='ml-[24px]'>
							<Typography title='FAQ' type={TypographyTypes.H6} weight='mid' />
						</li>
					</ul>
				</nav>
			</div>
			<div className='flex '>
				<button>Wallet</button>
				<div className='ml-[13px]'>Author</div>
			</div>
		</header>
	)
}
