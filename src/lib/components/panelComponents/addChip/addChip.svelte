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
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + buttonClass}>Produkt hinzufügen</Dialog.Trigger>
    <Dialog.Content class={contentClass}>
        <Dialog.Header>
            <Dialog.Title>Produkt hinzufügen</Dialog.Title>
        </Dialog.Header>
        <form method="POST" action="?/addChip" use:enhance class="flex flex-col space-y-1.5 h-full">
            <Form.Field {form} name="name" class="flex-row gap-9 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label >Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.name} class="border-2 rounded-lg" type="text"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="price" class="flex-row gap-4 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label>Preis</Form.Label>
                    <Input {...attrs} bind:value={$formData.price} class="border-2 rounded-lg" type="number"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button class="dark" on:click={() => {open = false; invalidateAll()}}>Chip hinzufügen</Form.Button>
        </form>
    </Dialog.Content>
</Dialog.Root>