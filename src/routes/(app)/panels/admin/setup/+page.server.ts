import { validateUser } from "$lib/functions/validateAdmin"
import { error, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import prisma from "$lib/prisma/prisma"
import { addUserSchema } from "$lib/components/panelComponents/addUser/addUserSchema"
import { addChipSchema } from '$lib/components/panelComponents/addChip/addChipSchema.js';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
    

async function getProducts() {
    const chips = await prisma.product.findMany()
    return chips
}

async function getUsers() {
    return await prisma.user.findMany()
}


export const load: PageServerLoad = async ({cookies}) => {
    const validationData = validateUser(cookies)
    let isValidated = false
    if (!(await validationData).validated) {
        console.log("User " + (await validationData).userName + " denied access.")
        error(403, {message: "Zugriff verweigert"})
    }
    else {
        console.log("User " + (await validationData).userName + " successfully logged in!")
        isValidated = true
    }

    
    return {
        isValidated: isValidated,
        products: await getProducts(),
        users: await getUsers(),
        addChipSchema: await superValidate(zod(addChipSchema)),
        addUserSchema: await superValidate(zod(addUserSchema)),
    }
}

export const actions = {
    addUser: async ({request}) => {
        const data = await request.formData()
        await prisma.user.create({
            data: {
                name: data.get("userName") as string,
                password: data.get("password") as string,
                isAdmin: Boolean(JSON.parse(data.get("isAdmin") as string))
            }
        })
    },
    addChip: async ({request}) => {

        const data = await request.formData()
        await prisma.product.create({
            data: {
                price: +(data.get("price") as string),
                name: (data.get("name") as string),
            }
        })
    }
} satisfies Actions