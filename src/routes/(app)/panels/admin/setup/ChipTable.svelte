<script lang="ts">
	import type { PageServerData } from "./$types";
    import * as Table from "$lib/components/ui/table";
    export let data: PageServerData

    import { Trash } from 'lucide-svelte';
	import DeleteChip from "./deleteChip.svelte";
	import type { Product } from "@prisma/client";
	import EditProduct from "./EditProduct.svelte";

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
            <Table.Head>Aktionen</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each sortChips(data.products) as chip}
            <Table.Row>
                <Table.Cell>{chip.name}</Table.Cell>
                <Table.Cell>{chip.price}</Table.Cell>
                <Table.Cell class="flex flex-row gap-4">
                    <DeleteChip id={chip.id}/>
                    <EditProduct data={data.addChipSchema} product={chip}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

