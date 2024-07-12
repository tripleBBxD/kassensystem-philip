import { validateUser } from "$lib/functions/validateUser"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "../$types"

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
        isValidated: isValidated
    }
}