import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'next/typescript',
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
		],
		ignorePatterns: ['**/tailwind.config.js'],
		rules: {
			semi: ['error', 'never'],
			'no-unused-vars': 'off',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			'@typescript-eslint/no-explicit-any': 'error',
		},
	}),
]

export default eslintConfig
