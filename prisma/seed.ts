import prisma from "../src/lib/prisma/prisma"

await prisma.chip.create({
    data: {
        price: 5
    }
})

await prisma.chip.create({
    data: {
        price: 2
    }
})

await prisma.bundle.create({
    data: {
        name: "Bundle 1",
        price: 6,
        chips: {
            connect: [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ]
        }
    }
})

await prisma.user.createMany({
    data: [{
        name: "user",
        isAdmin: false,
        password: "userPassword"
    },
    {
        name: "admin",
        isAdmin: true,
        password: "adminPassword"
    }
    ]
})

await prisma.transaction.create({
    data: {
        isPurchase: true,
        sessionId: 1234,
        bundles: {
            connect: {
                id: 1
            }
        },
        creator: {
            connect: {
                id: 2
            }
        }
    }
})