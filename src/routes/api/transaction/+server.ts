import prisma from '$lib/prisma/prisma.js'
import type { Chip } from '@prisma/client'
import type { Order } from '../../(app)/panels/admin/store/types.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { forEach } = require('p-iteration');



export async function POST({request, cookies}) {
    const data = await request.json() as Order

    const filteredChips = await data.chips?.filter((chip) => {
        if (chip.amount > 0) {
            return true
        }
    })

    const filteredBundles = await data.bundles?.filter((bundle) => {
        if (bundle.amount > 0) {
            return true
        }
    })
    const createChips = filteredChips?.map((oneChip) => ({amount: oneChip.amount, chip: {
        connect: {
            id: oneChip.chip.id
        }
    }})) || []
    
    const createBundle = filteredBundles?.map((oneBundle) => ({amount: oneBundle.amount, bundle: {
        connect: {
            id: oneBundle.bundle.id
        }
    }})) || []

    console.log(filteredBundles)


    await filteredBundles?.forEach(async (bundle) => {
        await bundle.bundle.chips.forEach(async (chip) => {
            await prisma.chip.update({
                where: {
                    id: chip.chip.id
                },
                data: {
                    currentAmount: {
                        decrement: (chip.amount * bundle.amount)
                    }
                }

            })
            console.log("c amount: " + chip.amount)
            console.log("b amount: " + bundle.amount)
        })
    })

    await filteredChips?.forEach(async (chip) => {
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
    })


    

    const transaction = await prisma.transaction.create({
        data: {
            isDeleted: false,
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
    


    return Response.json(transaction)
}