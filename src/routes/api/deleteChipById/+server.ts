import prisma from '$lib/prisma/prisma.js'

export async function POST({request}) {
    const data = await request.json() as {id: number}


    const res1 = await prisma.product.delete({
        where: {
            id: data.id
        }
    })

    console.log(res1)
    
    return Response.json(res1)
}