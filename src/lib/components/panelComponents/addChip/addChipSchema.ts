import { z } from "zod";



export const addChipSchema = z.object({
    name: z.string().min(1, {message: ""}),
    price: z.string().min(1,  {message: ""})
})

export type AddChipSchema = typeof addChipSchema;