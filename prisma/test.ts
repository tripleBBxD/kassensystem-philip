
import { User } from "@prisma/client";
import prisma from "../src/lib/prisma/prisma";

const data = await prisma.user.findMany({
    include: {
        transactions: {
            include: {
                bundles: {}
            }
        }
    }
})