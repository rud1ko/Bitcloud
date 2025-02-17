import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logo-light.svg'

export const Header = () => {
	return (
		<header className={'p-10px'}>
			<Link href={'/'}>
				<Image src={logo} alt='light-logo' unoptimized />
			</Link>
		</header>
	)
}
