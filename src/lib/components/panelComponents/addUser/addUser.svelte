<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content } from "$lib/components/ui/card"
    import { Input } from "$lib/components/ui/input";
    import * as Form from "$lib/components/ui/form";
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select/index.js";
	import type { Selected } from "bits-ui";
    import * as Dialog from "$lib/components/ui/dialog";
    import { z } from "zod";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { addUserSchema, type AddUserSchema } from "./addUserSchema.js";
	import { Field } from "formsnap";
    import { toast } from "svelte-sonner";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import { invalidateAll } from "$app/navigation";


    export let data: SuperValidated<Infer<AddUserSchema>>;
    const form = superForm(data, {
        validators: zodClient(addUserSchema)
    });
    const { form: formData, enhance } = form;

    export let buttonClass: string = ""
    export let contentClass: string = ""
    let open = false

</script>


<Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + buttonClass}>Nutzer hinzufügen</Dialog.Trigger>
    <Dialog.Content class={contentClass}>
        <Dialog.Header>
            <Dialog.Title>Nutzer hinzufügen</Dialog.Title>
        </Dialog.Header>
        <form method="POST" action="?/addUser" use:enhance class="flex flex-col space-y-1.5">
            <Form.Field {form} name="userName" class="flex-row gap-9 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label >Name </Form.Label>
                    <Input {...attrs} bind:value={$formData.userName} class="border-2 rounded-lg"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password" class="flex-row gap-4 items-center table-cell">
                <Form.Control let:attrs>
                    <Form.Label>Passwort</Form.Label>
                    <Input {...attrs} bind:value={$formData.password} class="border-2 rounded-lg"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="isAdmin" class="flex flex-row items-start space-x-3 space-y-0 pb-4 pt-4">
                <Form.Control let:attrs >
                    <Form.Label>Administrator</Form.Label>
                    <Checkbox {...attrs} bind:checked={$formData.isAdmin}/>
                    <input name={attrs.name} value={$formData.isAdmin} hidden />  
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button class="dark" on:click={() => {open = false; invalidateAll()}}>Nutzer hinzufügen</Form.Button>
        </form>
    </Dialog.Content>
</Dialog.Root>