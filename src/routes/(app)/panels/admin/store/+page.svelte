<script lang="ts">
    import "../../../../../app.css";
	import ChipsList from "./ProductList.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import {invalidateAll} from "$app/navigation";

	import { writable, type Writable } from 'svelte/store';
    import { RotateCcw } from 'lucide-svelte';
	import type { Order } from "./types";
	import type { PageServerData } from "./$types";
	import Input from "$lib/components/ui/input/input.svelte";

    export let data: PageServerData
    $: order.set(data.products.map((product) => {
            return {
                product: product,
                amount: 0
            }
        }).sort((a, b) => b.product.price - a.product.price)
    )

    let order: Writable<Order> = writable(data.products.map((product) => {
        return {
            product: product,
            amount: 0
        }
    }))


    async function handleSubmit() {
        const res = await fetch("/api/transaction", {
            body: JSON.stringify($order),
            method: "POST"
        })
        invalidateAll()
    }

    let priceOffset = 0

    
    let price = writable(0)
    $: price.set($order.map((product) => product.product.price * product.amount).reduce((acc, val) => acc + val, 0))
</script>

<div class="p-4 flex flex-row gap-2 flex-grow w-full justify-between h-screen">
    <div class="flex flex-col gap-4 w-full flex-grow">
        <div class="flex flex-row gap-4 h-full overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            <ChipsList order={order}/>
        </div>
        <div class="justify-between flex flex-row align-middle">
            <div class="flex flex-row gap-4">
                <Button  on:click={() => {handleSubmit()}}>Kaufen</Button>
                <Button  on:click={invalidateAll}><RotateCcw /></Button>
            </div>
            <div class="border align-middle flex flex-row gap-4 justify-center rounded-md px-4 items-center">
                <p>{$price} Bombasten</p>
            </div>
            
        </div>
        
    </div>
</div>


