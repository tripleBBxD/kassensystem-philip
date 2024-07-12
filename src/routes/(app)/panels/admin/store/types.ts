import type { Chip } from "@prisma/client";
import type { Bundle } from "@prisma/client";
import { number } from "zod";

export type Order = {
    chips?: {chip: Chip, amount: number}[]
    bundles?: {bundle: Bundle, amount: number}[]
}

type BundleWithChips = {
    id: number,
    name: string,
    price: number,
    chips?: {
        chipID: number,
        bundleID: number,
        amount: number,
        chip: Chip
    }[]
}