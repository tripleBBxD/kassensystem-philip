<script lang="ts">
	import type { PageServerData } from "./$types";
    import * as Table from "$lib/components/ui/table";
    export let data: PageServerData
    import type { Chip } from "$lib/types/chip";
    import { Trash } from 'lucide-svelte';
	import DeleteChip from "./deleteChip.svelte";

    function sortChips(chips: Chip[]) {
        return chips.sort((a, b) => a.value - b.value)
    }

</script>
<Table.Root>
    <Table.Caption>Liste aller Chips</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Wert</Table.Head>
            <Table.Head>Preis (Bombasten)</Table.Head>
            <Table.Head>Löschen</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each sortChips(data.chips) as chip}
            <Table.Row>
                <Table.Cell>{chip.value}</Table.Cell>
                <Table.Cell>{chip.price}</Table.Cell>
                <Table.Cell>
                    <DeleteChip id={chip.id}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

