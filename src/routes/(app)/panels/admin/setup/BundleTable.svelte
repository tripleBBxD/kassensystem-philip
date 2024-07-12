<script lang="ts">
	import type { PageServerData } from "./$types";
    import * as Table from "$lib/components/ui/table";
    export let data: PageServerData
    import { Trash } from 'lucide-svelte';
	import DeleteChip from "./deleteChip.svelte";
	import type { Bundle, Chip } from "@prisma/client";
	import DeleteBundle from "./deleteBundle.svelte";

    type BundleWithChips = {
        id: number,
        name: string,
        price: number,
        chips?: {
            chipID: number,
            bundleID: number,
            amount: number,
            chip: Chip
        }[]
    }

    function sortBundles(bundles: BundleWithChips[]): BundleWithChips[] {
        return bundles.sort((a, b) => a.price - b.price)
    }

    function getCombinedValue(bundle: BundleWithChips) {
        let value = 0
        if (!bundle.chips) {
            return 0
        }
        bundle.chips.forEach(chip => {
            value += chip.chip.value * chip.amount
        });
        return value
    }


</script>
<Table.Root>
    <Table.Caption>Liste aller Chips</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Preis (Bombasten)</Table.Head>
            <Table.Head>Gesamtwert</Table.Head>
            <Table.Head>Löschen</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each sortBundles(data.bundles) as chip}
            <Table.Row>
                <Table.Cell>{chip.name}</Table.Cell>
                <Table.Cell>{chip.price}</Table.Cell>
                <Table.Cell>{getCombinedValue(chip)}</Table.Cell>
                <Table.Cell>
                    <DeleteBundle id={chip.id}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

