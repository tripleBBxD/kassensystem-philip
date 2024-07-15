import prisma from "../src/lib/prisma/prisma"


await prisma.user.createMany({
    data: [
    {
        name: "admin",
        isAdmin: true,
        password: "adminPassword"
    }
    ]
})

await prisma.product.createMany({
    data: [{
        name: "Cola",
        price: 200,
    },
    {
        name: "Fanta",
        price: 150
    }]
})