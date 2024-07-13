import { z } from "zod";



export const addChipSchema = z.object({
    value: z.number().min(1, {message: ""}),
    price: z.number().min(1,  {message: ""}),
    totalAmount: z.number().min(1,  {message: ""})
})

export type AddChipSchema = typeof addChipSchema;