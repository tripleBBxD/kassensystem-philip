import { validateUser } from "$lib/functions/validateAdmin"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import prisma from "$lib/prisma/prisma"

export const ssr = false;

async function getProucts() {
    const products = await prisma.product.findMany()
    return products
}

async function getUsers() {
    return await prisma.user.findMany()
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
        products: await getProucts(),
        users: await getUsers(),
    }
}
