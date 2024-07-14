<script lang="ts">

    import type {OrderWritable } from "./types"
    import { Button } from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
    

    function increaseCount(index: number) {
        if($order.chips) {
            $order.chips[index].amount += 1
            console.log("increased count")
        }
    }

    function decreaseCount(index: number) {
        if($order.chips) {
            $order.chips[index].amount -= 1
            console.log("decreased count")
        }
    }
    export let order: OrderWritable
</script>



<Card class="flex flex-col justify-stretch h-full w-1/2">
    <CardHeader>
        <CardTitle>Chips</CardTitle>
    </CardHeader>
    <CardContent class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
        {#if !$order.chips}
            <p>Keine Chips vorhanden!</p>
        {:else}
            {#each $order.chips as chip, i}
            <p>Wert: {chip.chip.value} Bombasten</p>
            <div class="flex flex-row align-middle">
            {#if chip.amount === 0}
            <Button disabled class="rounded-r-none text-center align-middle">-</Button>
            {:else}
            <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
            {/if}
            <div class="flex flex-grow justify-center">
                <p class=" text-center align-middle m-auto">{chip.amount}</p>
            </div>
            {#if (chip.chip.currentAmount - chip.amount - 1) < 0}
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