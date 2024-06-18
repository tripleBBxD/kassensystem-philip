import { error, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma/prisma';

async function validateUser(cookies: Cookies)  {
    const sessionUserID = cookies.get("sessionUserID") || "0"
    console.log("Read session ID: " + sessionUserID)
    const userData = await prisma.user.findUnique({
        where: {
            id: +sessionUserID
        },
        select: {
            name: true,
            currentSession: true,
            isAdmin: true
        }
    })
    
    const currentuserData = cookies.get("sessionID") || "0"
    console.log("Valid session ID: " + userData?.currentSession)
    return {
        validated: userData?.currentSession?.toString()==currentuserData && userData.isAdmin,
        userName: userData?.name
    }
}

export const load: PageServerLoad = async ({cookies}) => {
    const validationData = validateUser(cookies)
    if (!(await validationData).validated) {
        console.log("User " + (await validationData).userName + " denied access.")
        error(403, {message: "Zugriff verweigert"})
    }
    else {
        console.log("User " + (await validationData).userName + " successfully logged in!")
    }
}