import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

export interface InputWithLabelProps {
	id: string
	placeholder: string
	label: string
    type: HTMLInputTypeAttribute
    required?: boolean
    disable?: boolean
    maxLength?: number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
