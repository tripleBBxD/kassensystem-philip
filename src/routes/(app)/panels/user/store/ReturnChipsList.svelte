<script lang="ts">

    import type { Order } from "./types"
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"    
	import type { Chip } from "@prisma/client";
	import type { Writable } from "svelte/store";

    function increaseCount(index: number) {
        $returnChips[index].amount += 1
        console.log("increased count")
    }

    function decreaseCount(index: number) {
        $returnChips[index].amount -= 1
        console.log("decreased count")
    }

    type ChipWithAmount = {
        chip: Chip;
        amount: number;
    }

    export let returnChips: Writable<ChipWithAmount[]>
</script>



<Card class="flex flex-col justify-stretch h-full w-full ">
    <CardHeader>
        <CardTitle>Chips zurückgeben</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
        {#if !returnChips}
            <p>Keine Chips vorhanden!</p>
        {:else}
            {#each $returnChips as chip, i}
            <p>Wert: {chip.chip.value} Bombasten</p>
            <div class="flex flex-row align-middle">
            {#if chip.amount === 0}
            <Button disabled class="rounded-r-none">-</Button>
            {:else}
            <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
            {/if}
            <div class="flex flex-grow justify-center">
                <p class=" text-center align-middle m-auto">{chip.amount}</p>
            </div>
            {#if (chip.chip.totalAmount - chip.chip.currentAmount - chip.amount) === 0}
            <Button disabled class="rounded-l-none text-center align-middle">+</Button>
            {:else}
            <Button class="rounded-l-none text-center align-middle" on:click={() => increaseCount(i)}>+</Button>
            {/if}
            </div>
            <br>
            {/each}
        {/if}
    </CardContent>

</Card>