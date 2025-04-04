import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button } from '@/shared/ui/button'

export default function Home() {
	return (
		<div>
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
		</div>
	)
}
