'use client'
import { cn } from '@/app/_lib'
import { COLOR_VARIANTS } from '@/shared/constants'
import { useMemo } from 'react'
import {
	TypographyElements,
	TypographyStyles,
} from '../consts/Typography.consts'
import { weightVariants } from '../consts/weightVariants.consts'
import { TypographyProps } from '../model/Typography.interface'
import { TColorVariants } from '@/shared/model'

const Typography = ({
	type,
	title,
	color = 'black',
	weight = 'bold',
	className,
}: TypographyProps) => {
	const BaseTypography = TypographyElements[type]
	const sizeClass = TypographyStyles[type]

	const baseStyles = useMemo(
		() => ({
			weight: weightVariants[weight],
			color: COLOR_VARIANTS[color],
		}),
		[color]
	)

	return (
		<BaseTypography
			className={cn(sizeClass, baseStyles.weight, baseStyles.color, className)}
		>
			{title}
		</BaseTypography>
	)
}

export { Typography }
