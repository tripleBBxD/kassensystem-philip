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
    import { addChipSchema, type AddChipSchema } from "./addChipSchema.js";
    import * as Dialog from "$lib/components/ui/dialog";
	import { invalidateAll } from "$app/navigation";


    export let buttonClass: string = ""
    export let contentClass: string = ""
    export let data: SuperValidated<Infer<AddChipSchema>>

    const form = superForm(data, {
        validators: zodClient(addChipSchema)
    });
    const { form: formData, enhance } = form;

    let open = false

</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + buttonClass}>Chip hinzufügen</Dialog.Trigger>
    <Dialog.Content class={contentClass}>
        <Dialog.Header>
            <Dialog.Title>Chip hinzufügen</Dialog.Title>
        </Dialog.Header>
        <form method="POST" action="?/addChip" use:enhance class="flex flex-col space-y-1.5 h-full">
            <Form.Field {form} name="value" class="flex-row gap-9 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label >Wert</Form.Label>
                    <Input {...attrs} bind:value={$formData.value} class="border-2 rounded-lg"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="price" class="flex-row gap-4 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label>Preis</Form.Label>
                    <Input {...attrs} bind:value={$formData.price} class="border-2 rounded-lg"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="totalAmount" class="flex-row gap-4 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label>Gesamtmenge</Form.Label>
                    <Input {...attrs} bind:value={$formData.totalAmount} class="border-2 rounded-lg"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button class="dark" on:click={() => {open = false; invalidateAll()}}>Chip hinzufügen</Form.Button>
        </form>
    </Dialog.Content>
</Dialog.Root>