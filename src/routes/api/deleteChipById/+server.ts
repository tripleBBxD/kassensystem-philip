import prisma from '$lib/prisma/prisma.js'

export async function POST({request}) {
    const data = await request.json() as {id: number}
    const res1 = await prisma.chip.update({
        where: {
            id: data.id
        },
        data: {
            bundles: {
                deleteMany: {}
            }
        },
        include: {
            bundles: true
        }
    })

    await prisma.chip.delete({
        where: {
            id: data.id
        }
    })
    
    return Response.json(res1)
}