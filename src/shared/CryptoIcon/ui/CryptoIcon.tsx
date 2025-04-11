import Image, { StaticImageData } from 'next/image'
import bnb from '../../../../public/assets/bnb.png'
import btc from '../../../../public/assets/btc.png'
import cardano from '../../../../public/assets/cardano.png'
import doge from '../../../../public/assets/doge.png'
import eth from '../../../../public/assets/eth.png'
import solana from '../../../../public/assets/solana.png'
import xrp from '../../../../public/assets/tether.png'
import tron from '../../../../public/assets/tron.png'
import usdc from '../../../../public/assets/usdc.png'
import tether from '../../../../public/assets/xrp.png'

const CryptoIconImage: React.FC<{
	source: StaticImageData
	symbol: string
}> = ({ source, symbol }) => {
	return <Image src={source} alt={symbol} width={25} height={25} />
}

export const CryptoIcon: React.FC<{ symbol: string }> = ({ symbol }) => {
	switch (symbol) {
		case 'BTC':
			return <CryptoIconImage source={btc} symbol={symbol} />
		case 'ETH':
			return <CryptoIconImage source={eth} symbol={symbol} />
		case 'XRP':
			return <CryptoIconImage source={tether} symbol={symbol} />
		case 'USDT':
			return <CryptoIconImage source={xrp} symbol={symbol} />
		case 'BNB':
			return <CryptoIconImage source={bnb} symbol={symbol} />
		case 'SOL':
			return <CryptoIconImage source={solana} symbol={symbol} />
		case 'USDC':
			return <CryptoIconImage source={usdc} symbol={symbol} />
		case 'DOGE':
			return <CryptoIconImage source={doge} symbol={symbol} />
		case 'ADA':
			return <CryptoIconImage source={cardano} symbol={symbol} />
		case 'TRX':
			return <CryptoIconImage source={tron} symbol={symbol} />
		default:
			break
	}
}
