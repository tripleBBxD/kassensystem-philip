import { z } from "zod";



export const addChipSchema = z.object({
    value: z.string().min(1, {message: ""}),
    price: z.string().min(1,  {message: ""}),
    totalAmount: z.string().min(1,  {message: ""})
})

export type AddChipSchema = typeof addChipSchema;