import type { Chip } from "@prisma/client";
import type { Bundle } from "@prisma/client";
import type { Writable } from "svelte/store";
import { number } from "zod";

export type OrderWritable = Writable<{
    chips?: {chip: Chip, amount: number}[]
    bundles?: {bundle: BundleWithChips, amount: number}[]
}>
export type Order = {
    chips?: {chip: Chip, amount: number}[]
    bundles?: {bundle: BundleWithChips, amount: number}[]
}

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