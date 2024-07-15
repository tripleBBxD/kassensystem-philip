import prisma from '$lib/prisma/prisma.js'
import type { Product } from '@prisma/client'

export async function POST({request}) {
    const data = await request.json() as Product

    const res1 = await prisma.product.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            price: +data.price
        }
    })

    console.log(res1)
    
    return Response.json(res1)
}