<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Dialog from "$lib/components/ui/dialog";
	import type { Chip } from "@prisma/client";
	import {invalidateAll } from "$app/navigation";

    export let allChips: Chip[]

    let chipsWithCount = allChips.map((chip) => {
        return {
            chip: chip,
            amount: 0
        }
    })
    let price: number
    let name: string


    allChips.sort((a, b) => {return a.value - b.value})

    async function handleSubmit() {
        const res = await fetch(
            "/api/bundles",
            {
                method: "POST",
                body: JSON.stringify({
                    chips: chipsWithCount,
                    price: price,
                    name: name
                })
            }
        )
        open = false
        invalidateAll()

    }
    
    let open = false
    export let buttonClass: string = ""
    export let contentClass: string = ""

    function increaseCount(index: number) {
        chipsWithCount[index].amount+=1   
    }
    function decreaseCount(index: number) {
        chipsWithCount[index].amount-=1   
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + buttonClass}>Paket hinzufügen</Dialog.Trigger>

    <Dialog.Content class={contentClass + "max-h-5/6"}>
        <Dialog.Header>
            <Dialog.Title>Paket hinzufügen</Dialog.Title>
        </Dialog.Header>
        
            <Label>Name</Label>
        <Input bind:value={name} type="text" >Name</Input>
        <hr>
        <Label>Preis (Bombasten)</Label>
        <Input bind:value={price} type="number" >Price</Input>
        <hr>
        <div class="overflow-y-auto scrollbar-track-transparent scrollbar scrollbar-thumb-foreground">
            {#each chipsWithCount as chipWithCount, i}
            <p>Wert: {chipWithCount.chip.value}</p>
                <div class="flex flex-row align-middle">
                <Button class="rounded-r-none text-center align-middle" on:click={() => decreaseCount(i)}>-</Button>
                <div class="flex flex-grow justify-center">
                    <p class=" text-center align-middle m-auto">{chipWithCount.amount}</p>
                </div>
                <Button class="rounded-l-none" on:click={() => increaseCount(i)}>+</Button>
                </div>
            {/each}
         </div>
    <Dialog.Footer>
        <Button type="submit" on:click={handleSubmit}>Paket Hinzufügen</Button>
    </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>