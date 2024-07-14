<script lang="ts">

    import type { OrderWritable } from "./types"
    import { Button } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
    

    function increaseCount(index: number) {
        if($order.bundles) {
            $order.bundles[index].amount += 1
            console.log($order.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0))
        }
    }

    function decreaseCount(index: number) {
        if($order.bundles) {
            $order.bundles[index].amount -= 1
            console.log($order.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0))
        }
    }
    export let order: OrderWritable
</script>

<Card class="flex flex-col justify-stretch h-full  w-1/2">
    <CardHeader>
        <CardTitle>Pakete</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-secondary active:scrollbar-thumb-foreground">
        {#if !$order.bundles}
            <p>Keine Pakete vorhanden!</p>
        {:else}
            {#each $order.bundles as bundle, i}
            <p>{bundle.bundle.name}</p>
            <div class="flex flex-row align-middle">
            {#if bundle.amount === 0}
            <Button disabled class="rounded-r-none text-center align-middle">-</Button>
            {:else}
            <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
            {/if}
            <div class="flex flex-grow justify-center">
                <p class=" text-center align-middle m-auto">{bundle.amount}</p>
            </div>
            {#if bundle.bundle.chips.map((chip) => {return (chip.chip.currentAmount - (bundle.amount + 1) * chip.amount) >= 0}).includes(false)}
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