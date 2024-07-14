import { validateUser } from "$lib/functions/validateAdmin"
import { error, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import prisma from "$lib/prisma/prisma"
import { addUserSchema } from "$lib/components/panelComponents/addUser/addUserSchema"
import { addChipSchema } from '$lib/components/panelComponents/addChip/addChipSchema.js';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
    

async function getChips() {
    const chips = await prisma.chip.findMany()
    return chips
}

async function getUsers() {
    return await prisma.user.findMany()
}

async function getBundles() {
    const bundles = await prisma.bundle.findMany({
        include: {
            chips: {
                include: {
                    chip: true,
                }
            }
        }
    })
    return bundles

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
        chips: await getChips(),
        users: await getUsers(),
        bundles: await getBundles(),
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
        console.log((data.get("price") as string))
        console.log((data.get("value") as string))
        console.log((data.get("totalAmount") as string))
        await prisma.chip.create({
            data: {
                price: +(data.get("price") as string),
                value: +(data.get("value") as string),
                totalAmount: +(data.get("totalAmount") as string),
                currentAmount: +(data.get("totalAmount") as string)
            }
        })
    }
} satisfies Actions