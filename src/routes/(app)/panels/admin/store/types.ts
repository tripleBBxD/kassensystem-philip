import type { Product } from "@prisma/client";
import type { Writable } from "svelte/store";
import { number } from "zod";

export type OrderWritable = Writable<Order>
export type Order = {
    product: Product, amount: number
}[]

type BundleWithChips = ({
    chips: ({
        chip: {
            id: number;
            value: number;
            price: number;
            totalAmount: number;
            currentAmount: number;
        };
    } & {
        chipID: number;
        bundleID: number;
        amount: number;
    })[];
} & {
    id: number;
    name: string;
    price: number;
})