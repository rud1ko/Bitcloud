import { db } from '@/globals/css/lib/db'
import { Typography, TypographyTypes } from '@/shared/Typography'
import { Button } from '@/shared/ui/button'

export default async function Home() {
	const coins = await db.coin.findMany()

	const sortedData = [...coins].sort((a, b) => {
		if (a.rank < b.rank) return -1
		if (a.rank > b.rank) return 1
		return 0
	})

	console.log(sortedData)

	return (
		<div>
			<Typography type={TypographyTypes.H1} title='HomePage' />
			<Typography type={TypographyTypes.H2} title='HomePage' />
			<Typography type={TypographyTypes.H3} title='HomePage' />
			<Typography type={TypographyTypes.H4} title='HomePage' />
			<Typography type={TypographyTypes.H5} title='HomePage' />
			<Typography type={TypographyTypes.H6} title='HomePage' />
			<Typography type={TypographyTypes.TEXT} title='HomePage' />
			<Button>Hello</Button>
			{sortedData.map(el => (
				<h1 key={el.rank}>{el.name}</h1>
			))}
		</div>
	)
}
