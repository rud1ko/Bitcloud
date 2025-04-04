import { Typography, TypographyTypes } from '@/shared/Typography'
import { FacebookIcon } from './Facebook.icon'
import { InstagramIcon } from './Instagram.icon'
import { TwitterIcon } from './Twitter.icon'
import { YoutubeIcon } from './Youtube.icon'

export const Footer = () => {
	return (
		<footer className='flex items-center justify-between p-[21px_186px]'>
			<Typography
				type={TypographyTypes.TEXT}
				title='Copyright @ 2025'
				weight='reg'
			/>
			<div className='flex gap-[16px]'>
				<FacebookIcon />
				<InstagramIcon />
				<YoutubeIcon />
				<TwitterIcon />
			</div>
		</footer>
	)
}
