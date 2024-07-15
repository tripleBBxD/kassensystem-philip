import prisma from '$lib/prisma/prisma.js'
import type { Product } from '@prisma/client'
import type { Order } from '../../(app)/panels/admin/store/types.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { forEach } = require('p-iteration');



export async function POST({request, cookies}) {
    const data = await request.json() as Order

    const filteredChips = await data?.filter((chip) => {
        if (chip.amount > 0) {
            return true
        }
    })

    const createChips = filteredChips?.map((oneChip) => ({amount: oneChip.amount, product: {
        connect: {
            id: oneChip.product.id
        }
    }})) || []

    const transaction = await prisma.transaction.create({
        data: {
            price: filteredChips.map((product) => product.product.price * product.amount).reduce((acc, val) => acc + val, 0),
            sessionId: +(cookies.get("sessionID") as string),
            creator: {
                connect: {
                    id: +(cookies.get("sessionUserID") as string)
                }
            },
            products: {
                create: createChips
            }
        },
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    })

    return Response.json(transaction)
}