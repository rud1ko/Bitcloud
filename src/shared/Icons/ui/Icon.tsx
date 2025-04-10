import Image from 'next/image'
import xrpLogo from '../../../../public/xrp-xrp.png'
import { BitcoinIcon } from './Bitcoin.icon'
import { EthereumIcon } from './Ethereum.icon'
import { TetherIcon } from './Tether.icon'

export const Icon: React.FC<{ title: string }> = ({ title }) => {
	switch (title) {
		case 'bitcoin':
			return <BitcoinIcon />
		case 'ethereum':
			return <EthereumIcon />
		case 'xrp':
			return <Image width={20} height={20} src={xrpLogo} alt={title} />
		case 'tether':
			return <TetherIcon />
		default:
			return null
	}
}
