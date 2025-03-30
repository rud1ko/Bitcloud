import { TypographyProps, TypographyTypes } from '../model/Typography.interface'

const Typography = ({ type, title, color = '#000' }: TypographyProps) => {
	switch (type) {
		case TypographyTypes.H1:
			return <h1 className='text-[48px] font-bold text-(--primary)'>{title}</h1>
		case TypographyTypes.H2:
			return <h2 className='text-[40px] font-bold'>{title}</h2>
		case TypographyTypes.H3:
			return <h3 className='text-[32px] font-bold'>{title}</h3>
		case TypographyTypes.H4:
			return <h4 className='text-[24px] font-bold'>{title}</h4>
		case TypographyTypes.H5:
			return <h5 className='text-[20px] font-bold'>{title}</h5>
		case TypographyTypes.H6:
			return <h6 className='text-[16px] font-bold'>{title}</h6>
		case TypographyTypes.TEXT:
			return <p className='text-[12px] font-bold'>{title}</p>
		default:
			break
	}
}

export { Typography }
