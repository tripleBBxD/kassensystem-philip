import { validateUser } from "$lib/functions/validateUser.js"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import prisma from "$lib/prisma/prisma"

export const ssr = false;

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
                    chip: true
                }
            }
        }
    })
    return bundles

}

export const load: PageServerLoad = async ({cookies}) => {
    console.log("loading")
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
    }
}
