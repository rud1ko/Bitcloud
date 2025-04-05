import { authOptions } from '@/globals/config/auth'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button } from '@/shared/ui/button'
import { getServerSession } from 'next-auth'

export default async function Home() {
	const session = await getServerSession(authOptions)

	console.log(session)

	// if (!session) redirect("/signIn")

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
			{session?.user?.name}
		</div>
	)
}
