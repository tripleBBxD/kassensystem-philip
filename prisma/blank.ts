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
