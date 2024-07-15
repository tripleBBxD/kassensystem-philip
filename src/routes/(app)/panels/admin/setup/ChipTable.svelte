<script lang="ts">
	import type { PageServerData } from "./$types";
    import * as Table from "$lib/components/ui/table";
    export let data: PageServerData

    import { Trash } from 'lucide-svelte';
	import DeleteChip from "./deleteChip.svelte";
	import type { Product } from "@prisma/client";

    function sortChips(chips: Product[]) {
        return chips.sort((a, b) => a.name.localeCompare(b.name))
    }

</script>
<Table.Root>
    <Table.Caption>Liste aller Produkte</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Preis (Bombasten)</Table.Head>
            <Table.Head>Löschen</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each sortChips(data.products) as chip}
            <Table.Row>
                <Table.Cell>{chip.name}</Table.Cell>
                <Table.Cell>{chip.price}</Table.Cell>
                <Table.Cell>
                    <DeleteChip id={chip.id}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

