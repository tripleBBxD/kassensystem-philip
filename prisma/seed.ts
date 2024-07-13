import prisma from "../src/lib/prisma/prisma"


await prisma.chip.create({
    data: {
        value: 5,
        price: 5,
        totalAmount: 100,
        currentAmount: 100
    }
})

await prisma.chip.create({
    data: {
        value: 2,
        price: 2,
        totalAmount: 200,
        currentAmount: 200
    }
})

await prisma.bundle.create({
    data: {
        name: "Bundle 1",
        price: 6,
        chips: {
            create: [
                {
                    amount: 4,
                    chip: {
                        connect: {
                            id: 1
                        }
                    }
                },
                {
                    amount: 2,
                    chip: {
                        connect: {
                            id: 2
                        }
                    }
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
            create: {
                bundle: {
                    connect: {
                        id: 1
                    }
                },
                amount: 1
            }
        },
        chips: {
            create: [
                {
                    chip: {
                        connect: {
                            id: 1
                        }
                    },
                    amount: 6
                },
                {
                    chip: {
                        connect: {
                            id: 2
                        }
                    },
                    amount: 9
                }
            ]
        },
        creator: {
            connect: {
                id: 2
            }
        }
    }
})