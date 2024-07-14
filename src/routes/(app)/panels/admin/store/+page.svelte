<script lang="ts">
    import "../../../../../app.css";
	import type { PageServerData } from "./$types";
    import BundleList from "./BundleList.svelte";
	import ChipsList from "./ChipsList.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import {invalidateAll} from "$app/navigation";
	import ReturnChipsList from "./ReturnChipsList.svelte";
	import { writable } from 'svelte/store';

    export let data: PageServerData
    $: order.set({
        bundles: data.bundles.map((bundle) => {return {
            bundle: bundle,
            amount: 0
        }}),
        chips: data.chips.map((chip) => {return {
            chip: chip,
            amount: 0
        }}),
    })

    let order = writable({
        bundles: data.bundles.map((bundle) => {return {
            bundle: bundle,
            amount: 0
        }}),
        chips: data.chips.map((chip) => {return {
            chip: chip,
            amount: 0
        }}),
    })

    $: returnChips = (data.chips.map((chip) => {return {
            chip: chip,
            amount: 0
        }}))
    async function handleSubmit() {
        const res = await fetch("/api/transaction", {
            body: JSON.stringify($order),
            method: "POST"
        })
        invalidateAll()
    }

    async function handleReturnChips() {
        
    }
    
    let price = writable(0)
    $: price.set($order.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + $order.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0) )
</script>

<div class="p-4 flex flex-row gap-4 flex-grow w-full justify-between h-screen">
    <div class="flex flex-col gap-4 w-2/3 flex-grow">
        <div class="flex flex-row gap-4 h-full overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            <BundleList order={order}/>
            <ChipsList order={order}/>
        </div>
        <div class="justify-between flex flex-row pr-2 align-middle">
            <div class="flex flex-row gap-4">
                <Button  on:click={() => {handleSubmit()}}>Kaufen</Button>
                <Button  on:click={invalidateAll}>Zurücksetzen</Button>
            </div>
            <div class="border align-middle flex justify-center rounded-md px-4 items-center">
                <p>{$price} Bombasten</p>
            </div>
            
        </div>
        
    </div>
    <div class="flex flex-grow">
        
    </div>
    <div class="flex flex-col gap-4 w-2/3 flex-grow">
        <div class="flex flex-row gap-4 h-full overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            <ReturnChipsList returnChips={returnChips}/>
        </div>
        <div class="justify-end">
            <Button  on:click={() => {handleReturnChips()}}>Zurückgeben</Button>
            
        </div>
        
    </div>
</div>


