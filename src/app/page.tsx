import { db } from '@/shared/lib/db'
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
			<h1>Home Page</h1>
			<Button>Hello</Button>
			{sortedData.map(el => (
				<h1 key={el.rank}>{el.name}</h1>
			))}
		</div>
	)
}
