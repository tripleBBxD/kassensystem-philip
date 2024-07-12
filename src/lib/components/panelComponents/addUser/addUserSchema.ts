import { z } from "zod";



export const addUserSchema = z.object({
    userName: z.string().min(2, {message: ""}),
    password: z.string().min(2,  {message: ""}),
    isAdmin:  z.boolean()
})

export type AddUserSchema = typeof addUserSchema;