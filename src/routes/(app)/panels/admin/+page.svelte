<script lang="ts">
    import AddUser from "$lib/components/panelComponents/addUser/addUser.svelte";
    import AddChip from "$lib/components/panelComponents/addChip/addChip.svelte";
    import AddBundle from "$lib/components/panelComponents/addBundle/addBundle.svelte";
	import type { PageData } from "./$types";
    import { Toaster } from "svelte-sonner";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";

    export let data: PageData

    $: transactions = data.allTransactions

    function getDateFormatted(date: Date) {
        return (date.getDay() + "." + date.getMonth() + ", " + date.getHours() +":" + date.getMinutes())
    }
</script>

<p>Hi</p>
<Table.Root>
    <Table.Caption>
        Transaktionen
    </Table.Caption>
    <Table.Header>
        <Table.Head>Durchgeführt von</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Erstellt am</Table.Head>
        <Table.Head>Pakete</Table.Head>
        <Table.Head>Chips</Table.Head>
    </Table.Header>
    <Table.Body>
        {#each (transactions) as transaction}
             <Table.Row>
                <Table.Cell>{transaction.creator.name}</Table.Cell>
                <Table.Cell>{transaction.isPurchase ? "Gekauft": "Gelöscht"}</Table.Cell>
                <Table.Cell>{getDateFormatted(new Date(transaction.createdAt))}</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>