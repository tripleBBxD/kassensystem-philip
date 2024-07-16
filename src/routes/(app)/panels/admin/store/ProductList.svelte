<script lang="ts">

    import type {OrderWritable } from "./types"
    import { Button } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
    

    function increaseCount(index: number) {
        if($order) {
            $order[index].amount += 1
            console.log("increased count")
        }
    }

    function decreaseCount(index: number) {
        if($order) {
            $order[index].amount -= 1
            console.log("decreased count")
        }
    }
    export let order: OrderWritable
</script>



<Card class="flex flex-col justify-stretch h-full w-full">
    <CardHeader>
        <CardTitle>Chips</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
        {#if !$order}
            <p>Keine Produkte vorhanden!</p>
        {:else}
            {#each $order as product, i}
            <p class="">{product.product.name}</p>
            <div class="flex flex-row align-middle">
            {#if product.amount === 0}
            <Button disabled class="rounded-r-none text-center align-middle">-</Button>
            {:else}
            <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
            {/if}
            <div class="flex flex-grow justify-center">
                <p class=" text-center align-middle m-auto">{product.amount}</p>
            </div>
            <Button class="rounded-l-none text-center align-middle" on:click={() => increaseCount(i)}>+</Button>
            </div>
            {/each}
        {/if}
    </CardContent>

</Card>