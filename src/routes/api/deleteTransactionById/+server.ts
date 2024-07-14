import prisma from '$lib/prisma/prisma.js'

export async function POST({request}) {
    const data = await request.json() as {id: number}
    const transaction = prisma.transaction.findUnique({
        where: {
            id: data.id
        },
        include: {
            bundles: {
                include: {
                    bundle: {
                        include: {
                            chips: {
                                include: {
                                    chip: true
                                }
                            }
                        }
                    }
                }
            },
            chips: {
                include: {
                    chip: true
                }
            }
        }
    })
    const res1 = await prisma.transaction.update({
        where: {
            id: data.id
        },
        data: {
            isDeleted: true
        },
        include: {
            chips: true
      
      
        }
    })

    return Response.json(res1)
}