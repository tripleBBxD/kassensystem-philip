import prisma from '$lib/prisma/prisma.js'
import type { Chip } from '@prisma/client'


type incomingData = {
    name: string,
    price: number,
    chips: {
        chip: {
            id: number;
            value: number;
            price: number;
        };
        amount: number;
    }[];
}



export async function POST({request}) {
    const data = await request.json() as incomingData
    if (!data.chips) {
        return Response.json({"error": "Keine Chips vorhanden"})
    }

    console.log(data)

    const filteredChips = data.chips.filter((chip) => {
        console.log("Amount:"  + chip.amount)
        if (chip.amount > 0) {
            return true
        }
    })

    const createChips = filteredChips.map((oneChip) => ({amount: oneChip.amount, chip: {
        connect: {
            id: oneChip.chip.id
        }
    }}))

    const bundle = await prisma.bundle.create({
        data: {
            name: data.name,
            price: +data.price,
            chips: {
                create: createChips
            }
        },
        include: {
            chips: {
                include: {
                    chip: true
                }
            }
        }
    })
    
    console.log(bundle)

    return Response.json(bundle)
}