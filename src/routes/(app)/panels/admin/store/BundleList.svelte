<script lang="ts">

    import type { Order } from "./types"
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
	import type { Bundle, Chip } from "@prisma/client";
    import BentoGrid from "$lib/components/ui/BentoGrid/BentoGrid.svelte";
    

    function increaseCount(index: number) {
        if(order.bundles) {
            order.bundles[index].amount += 1
            console.log("increased count")
        }
    }

    function decreaseCount(index: number) {
        if(order.bundles) {
            order.bundles[index].amount -= 1
            console.log("decreased count")
        }
    }
    export let order: Order
</script>

<Card class="flex flex-col justify-stretch h-full  w-1/2">
    <CardHeader>
        <CardTitle>Pakete</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-secondary active:scrollbar-thumb-foreground">
        {#if !order.bundles}
            <p>Keine Pakete vorhanden!</p>
        {:else}
            {#each order.bundles as bundle, i}
            <p>{bundle.bundle.name}</p>
            <div class="flex flex-row align-middle">
            {#if bundle.amount === 0}
            <Button disabled class="rounded-r-none">-</Button>
            {:else}
            <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
            {/if}
            <div class="flex flex-grow justify-center">
                <p class=" text-center align-middle m-auto">{bundle.amount}</p>
            </div>
            <Button class="rounded-l-none" on:click={() => increaseCount(i)}>+</Button>
            </div>
            <br>
            {/each}
        {/if}
    </CardContent>
</Card>