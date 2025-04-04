import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/logo-dark.svg'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-[100vh]'>
			<div className='w-[420px] bg-auth bg-background-auth bg-cover bg-center'>
				<Link className='absolute top-[64px] left-[80px]' href={'/'}>
					<Image src={logo} alt='light-logo' unoptimized />
				</Link>
			</div>
			<div className='flex-grow'>{children}</div>
		</div>
	)
}
