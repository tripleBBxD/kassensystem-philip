<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";

    import { Input } from "$lib/components/ui/input";
    import * as Form from "$lib/components/ui/form";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { addChipSchema, type AddChipSchema } from "$lib/components/panelComponents/addChip/addChipSchema"
    import * as Dialog from "$lib/components/ui/dialog";
	import { invalidateAll } from "$app/navigation";
	import type { Product } from "@prisma/client";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { writable } from "svelte/store";


    export let data: SuperValidated<Infer<AddChipSchema>>

    export let product: Product


    let formData = writable({
        name: product.name,
        price: product.price
    })

    let open = false
    
    async function handleSubmit() {
        await fetch("/api/updateProductById", {
            method: "POST",
            body: JSON.stringify( {
                id: product.id,
                name: $formData.name || product.name,
                price: $formData.price || product.price
            })
        })
        invalidateAll()
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Edit</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Produkt bearbeiten</Dialog.Title>
        </Dialog.Header>
            <Label>Name</Label>
            <Input bind:value={$formData.name} name="name" class="border-2 rounded-lg" type="text"/>
            <Label>Preis</Label>
            <Input bind:value={$formData.price} class="border-2 rounded-lg" type="number"/>
            <Button class="dark" on:click={() => {open = false; handleSubmit()}}>Chip hinzufügen</Button>
    </Dialog.Content>
</Dialog.Root>