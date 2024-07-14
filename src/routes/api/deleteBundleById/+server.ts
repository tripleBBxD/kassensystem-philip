import prisma from '$lib/prisma/prisma.js'

export async function POST({request}) {
    const data = await request.json() as {id: number}
    const res1 = await prisma.bundle.update({
        where: {
            id: data.id
        },
        data: {
            chips: {
                deleteMany: {}
            }
        },
        include: {
            chips: true
      
      
        }
    })

    

    await prisma.bundle.delete({
        where: {
            id: data.id
        }
    })
    return Response.json(res1)
}