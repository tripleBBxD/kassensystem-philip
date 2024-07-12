import prisma from "$lib/prisma/prisma";
import type { LayoutServerLoad } from "./$types";

export const load = ( async ({ cookies }) => {
    const sessionUserID = cookies.get('sessionUserID')
    if (!sessionUserID) {
        throw(403)
    }
    return {
        sessionUserID: sessionUserID,
  
    }
})  satisfies LayoutServerLoad;