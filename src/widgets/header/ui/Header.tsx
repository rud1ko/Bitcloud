import { authOptions } from '@/globals/config/auth'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button, buttonVariants } from '@/shared/ui/button'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logo-light.svg'

export const Header = async () => {
	const session = await getServerSession(authOptions)

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
							<Link
								className={buttonVariants({ variant: 'ghost' })}
								href={'/buyAndSell'}
							>
								<Typography
									title='Buy & Sell'
									type={TypographyTypes.H6}
									weight='mid'
								/>
							</Link>
						</li>
						<li className='ml-[24px]'>
							<Link
								className={buttonVariants({ variant: 'ghost' })}
								href={'/market'}
							>
								<Typography
									title='Markets'
									type={TypographyTypes.H6}
									weight='mid'
								/>
							</Link>
						</li>
						<li className='ml-[24px]'>
							<Link
								className={buttonVariants({ variant: 'ghost' })}
								href={'/blog'}
							>
								<Typography
									title='Blogs'
									type={TypographyTypes.H6}
									weight='mid'
								/>
							</Link>
						</li>
						<li className='ml-[24px]'>
							<Link
								className={buttonVariants({ variant: 'ghost' })}
								href={'/faq'}
							>
								<Typography
									title='FAQ'
									type={TypographyTypes.H6}
									weight='mid'
								/>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className='flex items-center gap-[13px]'>
				{session?.user ? (
					<>
						<Button variant='head' asChild>
							<Link href={'/wallet'}>wallet</Link>
						</Button>
						<Button variant='head' asChild>
							<Link href={'/profile'}>Profile</Link>
						</Button>
					</>
				) : (
					<>
						<Button variant='head' asChild>
							<Link href={'/signUp'}>SignUp</Link>
						</Button>
						<Button variant='head' asChild>
							<Link href={'/signIn'}>SignIn</Link>
						</Button>
					</>
				)}
			</div>
		</header>
	)
}
