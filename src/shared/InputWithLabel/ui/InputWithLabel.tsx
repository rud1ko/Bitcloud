import { Input } from '@/shared/Input'
import { Label } from '@/shared/Label'
import * as React from 'react'
import { InputWithLabelProps } from '../model/InputWithLabel.interface'

export const InputWithLabel = React.forwardRef<
	HTMLInputElement,
	InputWithLabelProps
>(({ id, label, placeholder, type, required, disable, ...props }, ref) => {
	return (
		<div className='grid w-full max-w-sm items-center gap-1.5'>
			<Label htmlFor={id}>{label}</Label>
			<Input
				ref={ref}
				type={type}
				id={id}
				placeholder={placeholder}
				required={required}
                name={id}
                disabled={disable}
                {...props}
			/>
		</div>
	)
})
