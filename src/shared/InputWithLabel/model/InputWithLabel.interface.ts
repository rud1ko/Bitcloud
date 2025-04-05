import { HTMLInputTypeAttribute } from 'react'

export interface InputWithLabelProps {
	id: string
	placeholder: string
	label: string
    type: HTMLInputTypeAttribute
    required?: boolean
}
