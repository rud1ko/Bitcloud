import { Footer } from '@/widgets/footer/ui/Footer'
import { Header } from '@/widgets/header'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-grow bg-background-custom'>{children}</main>
			<Footer />
		</div>
	)
}
