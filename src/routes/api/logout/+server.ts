import prisma from "$lib/prisma/prisma"

export async function PUT({cookies}) {
    console.log("Logging out.")
    const currentUser = await cookies.get("sessionUserID")
    console.log("ID: " + currentUser)
    if (currentUser) {
        await prisma.user.update({
            where: {
                id: +currentUser
            },
            data: {
                currentSession: 1
            }
        })
    return new Response("Logged out user with id: " + currentUser)
    }
}       
