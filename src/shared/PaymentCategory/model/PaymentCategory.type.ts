import { VariantProps } from 'class-variance-authority'
import { paymentCategoryVariants } from '../ui/PaymentCategory'

type PaymentCategoryProps = {
	category: string
	title: string
} & VariantProps<typeof paymentCategoryVariants>

export type { PaymentCategoryProps }
