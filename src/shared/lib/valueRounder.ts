export const valueRounder = (value: string | number, fix: number) => {
	const numValue = typeof value === 'string' ? parseFloat(value) : value
	return numValue.toFixed(fix)
}
