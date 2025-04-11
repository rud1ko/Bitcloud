/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx,css}'],
	theme: {
		extend: {
			content: {
				empty: '',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			borderColor: {
				active: 'var(--success)',
				unactive: 'var(--trade-step-default-border)',
			},
			fontFamily: {
				second: 'var(--second-family)',
			},
			backgroundImage: {
				auth: "url('/bg-login.png')",
				passed: "url('/Passed.svg')",
			},
			boxShadow: {
				card: 'var(--coin-card)',
				trade: 'var(--trade-wrapper)',
			},
			backgroundColor: {
				success: 'var(--success)',
			},
			colors: {
				background: {
					DEFAULT: 'hsl(var(--background))',
					custom: 'var(--background-custom)',
					auth: 'var(--background-auth)',
					success: 'var(--background-success)',
				},
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					custom: 'var(--primary-custom)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					custom: 'var(--secondary-custom)',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
				white: {
					custom: 'var(--white-custom)',
				},
				black: {
					custom: 'var(--black-custom)',
				},
				gray: {
					custom: 'var(--gray-custom)'
				},
				dark: {
					custom: 'var(--dark-custom)',
				},
				blur1: 'var(--blur1)',
				blur2: 'var(--blur2)',
				success: 'var(--success)',
				ghost: 'var(--ghost)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
