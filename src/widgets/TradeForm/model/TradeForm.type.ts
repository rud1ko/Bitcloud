import { z } from 'zod'

const TradeFormFieldsSchema = z.object({
	pay: z.string({
		message: 'Pay is required',
	}),
	receive: z.string({
		message: 'Receive is required',
	}),
})

type TradeFormFields = z.infer<typeof TradeFormFieldsSchema>

export { TradeFormFieldsSchema, type TradeFormFields }
