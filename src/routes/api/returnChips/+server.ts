import prisma from '$lib/prisma/prisma.js'
import type { Chip } from '@prisma/client'
import type { Order } from '../../(app)/panels/admin/store/types.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { forEach } = require('p-iteration');



export async function POST({request, cookies}) {
    const data = await request.json() as {chip: Chip, amount: number}[]

    const filteredChips = data.filter((chip) => {
        if (chip.amount > 0) {
            return true
        }
    })
    console.log(filteredChips)

    const createChips = filteredChips?.map((oneChip) => ({amount: oneChip.amount, chip: {
        connect: {
            id: oneChip.chip.id
        }
    }})) || []
    console.log("CC:")
    console.log( createChips)
    

    await data.forEach(async (chip) => {
        await prisma.chip.update({
            where: {
                id: chip.chip.id
            },
            data: {
                currentAmount: {
                    increment: chip.amount
                }
            }

        })
        console.log("chipid: " + chip.chip.id)
        console.log("amount: " + chip.amount)
    })


    

    const transaction = await prisma.transaction.create({
        data: {
            isPurchase: false,
            isDeleted: false,
            sessionId: +(cookies.get("sessionID") as string),
            creator: {
                connect: {
                    id: +(cookies.get("sessionUserID") as string)
                }
            },
            chips: {
                create: createChips
            },
        },
        include: {
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