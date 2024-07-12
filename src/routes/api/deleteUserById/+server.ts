import prisma from '$lib/prisma/prisma.js'

export async function POST({request}) {
    const data = await request.json() as {id: number}
    const res = await prisma.user.delete({
        where: {
            id: data.id
        }
    })
    return Response.json(res)
}