import { JSX } from 'react'
import { TypographyTypes } from '../model/Typography.interface'

const TypographyStyles = {
	[TypographyTypes.H1]: 'text-[48px]',
	[TypographyTypes.H2]: 'text-[40px]',
	[TypographyTypes.H3]: 'text-[32px]',
	[TypographyTypes.H4]: 'text-[24px]',
	[TypographyTypes.H5]: 'text-[20px]',
	[TypographyTypes.H6]: 'text-[16px]',
	[TypographyTypes.TEXT]: 'text-[12px]',
}

const TypographyElements: Record<TypographyTypes, keyof JSX.IntrinsicElements> =
	{
		[TypographyTypes.H1]: 'h1',
		[TypographyTypes.H2]: 'h2',
		[TypographyTypes.H3]: 'h3',
		[TypographyTypes.H4]: 'h4',
		[TypographyTypes.H5]: 'h5',
		[TypographyTypes.H6]: 'h6',
		[TypographyTypes.TEXT]: 'p',
	}

export { TypographyElements, TypographyStyles }
