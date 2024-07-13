import prisma from '$lib/prisma/prisma.js'
import type { Chip } from '@prisma/client'
import type { Order } from '../../(app)/panels/admin/store/types.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { forEach } = require('p-iteration');



export async function POST({request, cookies}) {
    const data = await request.json() as Order

    const filteredChips = data.chips?.filter((chip) => {
        if (chip.amount > 0) {
            return true
        }
    })

    const createChips = filteredChips?.map((oneChip) => ({amount: oneChip.amount, chip: {
        connect: {
            id: oneChip.chip.id
        }
    }})) || []
    

    await data.chips?.forEach(async (chip) => {
        await prisma.chip.update({
            where: {
                id: chip.chip.id
            },
            data: {
                currentAmount: {
                    decrement: chip.amount
                }
            }

        })
        console.log("chipid: " + chip.chip.id)
        console.log("amount: " + chip.amount)
    })


    

    const transaction = await prisma.transaction.create({
        data: {
            isPurchase: true,
            sessionId: +(cookies.get("sessionID") as string),
            creator: {
                connect: {
                    id: +(cookies.get("sessionUserID") as string)
                }
            },
            bundles: {
                create: createBundle
            },
            chips: {
                create: createChips
            },
        },
        include: {
            bundles: {
                include: {
                    bundle: true
                }
            },
            chips: {
                include: {
                    chip: true
                }
            }
        }
    })
    
    console.log(transaction)

    return Response.json(transaction)
}