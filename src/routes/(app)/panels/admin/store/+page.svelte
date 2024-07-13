<script lang="ts">
    	import "../../../../../app.css";
	import type { PageServerData } from "./$types";
	import type { Order } from "./types";
    import BundleList from "./BundleList.svelte";
	import ChipsList from "./ChipsList.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { invalidate, invalidateAll } from "$app/navigation";
	import ReturnChipsList from "./ReturnChipsList.svelte";

    export let data: PageServerData
    $: order = {
        bundles: data.bundles.map((bundle) => {return {
            bundle: bundle,
            amount: 0
        }}),
        chips: data.chips.map((chip) => {return {
            chip: chip,
            amount: 0
        }}),
    }

    $: returnChips = (data.chips.map((chip) => {return {
            chip: chip,
            amount: 0
        }}))

    async function handleSubmit() {
        const res = await fetch("/api/transaction", {
            body: JSON.stringify(order),
            method: "POST"
        })
        invalidateAll()
    }
</script>

<div class="p-4 flex flex-row gap-4 flex-grow w-full justify-between h-screen">
    <div class="flex flex-col gap-4 w-2/3 flex-grow">
        <div class="flex flex-row gap-4 h-full overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            <BundleList order={order}/>
            <ChipsList order={order}/>
        </div>
        <div class="justify-end">
            <Button  on:click={() => {handleSubmit()}}>Kaufen</Button>
        </div>
        
    </div>
    <div class="flex flex-grow">
        
    </div>
    <div class="flex flex-col gap-4 w-2/3 flex-grow">
        <div class="flex flex-row gap-4 h-full overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            <ReturnChipsList returnChips={returnChips}/>
        </div>
        <div class="justify-end">
            <Button  on:click={() => {handleSubmit()}}>Zurückgeben</Button>
        </div>
        
    </div>
</div>


