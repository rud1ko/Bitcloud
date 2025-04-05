'use client'
import { colorVariants } from '@/globals/consts'
import { cn } from '@/globals/css/lib/css'
import { useMemo } from 'react'
import {
	TypographyElements,
	TypographyStyles,
} from '../consts/Typography.consts'
import { weightVariants } from '../consts/weightVariants.consts'
import { TypographyProps } from '../model/Typography.interface'

const Typography = ({
	type,
	title,
	color = 'black',
	weight = 'bold',
}: TypographyProps) => {
	const BaseTypography = TypographyElements[type]
	const sizeClass = TypographyStyles[type]

	const baseStyles = useMemo(
		() => ({
			weight: weightVariants[weight],
			color: colorVariants[color],
		}),
		[color]
	)

	return (
		<BaseTypography
			className={cn(sizeClass, baseStyles.weight, baseStyles.color)}
		>
			{title}
		</BaseTypography>
	)
}

export { Typography }
