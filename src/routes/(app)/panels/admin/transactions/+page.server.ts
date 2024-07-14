import { error, type Actions, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";

import { addUserSchema } from '$lib/components/panelComponents/addUser/addUserSchema.js';
import { zod } from "sveltekit-superforms/adapters";
import prisma from '$lib/prisma/prisma';
import { addBundleSchema } from '$lib/components/panelComponents/addBundle/addBundleSchema.js';
import { z } from 'zod';

import { validateUser } from "$lib/functions/validateAdmin"

async function getTransactions() {
    return await prisma.transaction.findMany({
        include: {
            bundles: {
                include: {
                    bundle: {
                        include: {
                            chips: {
                                include: {
                                    chip: true
                                }
                            }
                        }
                    }
                }
            },
            chips: {
                include: {
                    chip: true
                }
            },
            creator: true
        }
    })
}

export const load: PageServerLoad = async ({cookies}) => {
    const validationData = validateUser(cookies)
    let isValidated = false
    if (!(await validationData).validated) {
        console.log("User " + (await validationData).userName + " denied access.")
        error(403, {message: "Zugriff verweigert"})
    }
    else {
        console.log("User " + (await validationData).userName + " successfully logged in!")
        isValidated = true
    }
    return {
        allTransactions: await getTransactions(),
        isValidated: isValidated
    }
}
