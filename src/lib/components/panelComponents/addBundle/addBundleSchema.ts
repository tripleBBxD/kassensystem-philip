import { z } from "zod";



export const addBundleSchema = z.object({
    name: z.string(),
    price: z.number(),
    chips: z.array(z.object({
        value: z.number(),
        amount: z.number()
    }))
})

export type AddBundleSchema = typeof addBundleSchema;