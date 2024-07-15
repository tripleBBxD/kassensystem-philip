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
            products: {include: {product: true}},
            creator: true
        }
    })
}

async function getProducts() {
    return await prisma.product.findMany({
        include: {
            transactions: {
                include: {
                    transaction: {
                        include: {
                            products: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            }
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
        productsWithTransactions: await getProducts(),
        isValidated: isValidated
    }
}
