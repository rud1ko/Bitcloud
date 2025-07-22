import { TColorVariants } from '../model'

const COLOR_VARIANTS: Record<keyof TColorVariants, string> = {
	white: 'text-white-custom',
	black: 'text-black-custom',
	dark: 'text-dark-custom',
	primary: 'text-primary-custom',
	blur1: 'text-blur1',
	blur2: 'text-blur2',
	secondary: 'text-secondary-custom',
	success: 'text-success',
	ghost: 'text-ghost',
	gray: 'text-gray-custom',
}

export { COLOR_VARIANTS }
