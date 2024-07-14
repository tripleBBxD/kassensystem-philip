import prisma from "$lib/prisma/prisma"
import type { Cookies } from "@sveltejs/kit"

export async function validateUser(cookies: Cookies)  {
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
        validated: userData?.currentSession?.toString()==currentuserData,
        userName: userData?.name
    }
}