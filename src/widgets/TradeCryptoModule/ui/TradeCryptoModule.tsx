import { TradeProcess } from '@/shared/TradeProcess'

export const TradeCryptoModule = () => {
	return <div className='flex mt-[64px]'>
        <TradeProcess />
        <div className='p-[40px] shadow-card'>
            sell
        </div>
    </div>
}
