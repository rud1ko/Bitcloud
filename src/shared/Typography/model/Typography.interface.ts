import { ColorVariantsTypes } from '@/globals/consts/types/colors.types'

export enum TypographyTypes {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	H5 = 'h5',
	H6 = 'h6',
	TEXT = 'text',
}

export interface TypographyProps {
	type: TypographyTypes
	title: string
	color?: keyof ColorVariantsTypes
	weight?: 'reg' | 'mid' | 'bold'
	className?: string
}
