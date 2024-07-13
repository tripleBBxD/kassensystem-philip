<script lang="ts">

    import type { Order } from "./types"
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
	import type { Bundle, Chip } from "@prisma/client";
    

    function increaseCount(index: number) {
        if(order.chips) {
            order.chips[index].amount += 1
            console.log("increased count")
        }
    }

    function decreaseCount(index: number) {
        if(order.chips) {
            order.chips[index].amount -= 1
            console.log("decreased count")
        }
    }
    export let order: Order
</script>



<Card class="flex flex-col justify-stretch h-full w-1/2">
    <CardHeader>
        <CardTitle>Chips</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
        {#if !order.chips}
            <p>Keine Chips vorhanden!</p>
        {:else}
            {#each order.chips as chip, i}
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
            <Button class="rounded-l-none" on:click={() => increaseCount(i)}>+</Button>
            </div>
            <br>
            {/each}
        {/if}
    </CardContent>

</Card>