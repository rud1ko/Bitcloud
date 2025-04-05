import { VariantProps } from 'class-variance-authority'
import { percentBadgeVariants } from '../ui/PercentBadge'

export interface PercentBadgeProps
	extends VariantProps<typeof percentBadgeVariants> {
	percent: string
}
