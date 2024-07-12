
import { User } from "@prisma/client";
import prisma from "../src/lib/prisma/prisma";

const bundles = await prisma.bundle.findMany({
    include: {
        chips: {
            include: {
                bundle: true,
                chip: true
            }
        }
    }
})
console.log(bundles[0].chips)