import { goto } from '$app/navigation';
import prisma from '$lib/prisma/prisma.js'
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

export const actions = {
    login: async ({request, cookies}) => {
        console.log("Login process started")
        const data = await request.formData()
        const submittedName = data.get("username") as string
        const submittedPassword = data.get("password") as string
        const userData = await prisma.user.findFirst(
            {
                where:{
                    name: submittedName
                },
                select: {
                    password: true,
                    isAdmin: true,
                    id: true
                }
            }
        )
        if (submittedPassword === userData?.password) {
            const sessionId = randomIntFromInterval(10000, 99999)
            await prisma.user.update({
                where: {
                    name: submittedName
                },
                data: {
                    currentSession: sessionId
                }
            })
            cookies.set("sessionID", sessionId.toString(), {path: "/"})
            console.log("Set sessionID to " + sessionId.toString())
            cookies.set("sessionUserID", userData.id.toString(), {path:"/"})
            console.log("Set sessionUserID to " + userData.id.toString())
            if (userData.isAdmin) {
                redirect(303, "/panels/admin")
            }
            else {
                redirect(303, "/panels/user")
            }
        }
    }
} satisfies Actions