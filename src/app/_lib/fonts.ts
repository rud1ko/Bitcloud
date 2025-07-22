import { DM_Sans, Inter, Noto_Sans } from 'next/font/google'

const dmSans = DM_Sans({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-family',
})

const inter = Inter({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--second-family',
})

const notoSans = Noto_Sans({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--third-family',
})

export { dmSans, inter, notoSans }
