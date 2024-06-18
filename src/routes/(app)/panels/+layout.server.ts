import type { PageServerLoad } from "../$types";
import type { LayoutServerLoad } from "./$types";

export const load =( ({ cookies }) => {
    const sessionUserID = cookies.get('sessionUserID')
    if (!sessionUserID) {
        throw(403)
    }
    return {
        sessionUserID: sessionUserID
    }
})  satisfies LayoutServerLoad;