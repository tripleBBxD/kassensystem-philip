<script lang="ts" context="module">
    export let data: PageData
    export type AllTransactions = typeof data.allTransactions
</script>

<script lang="ts">
	import PrintButton from './PrintButton.svelte';
	import type { PageData } from "./$types";
    import * as Table from "$lib/components/ui/table";
	import DeleteTransaction from './DeleteTransaction.svelte';


    export let data: PageData

    type AllTransactions = typeof data.allTransactions

    let transactions: AllTransactions

    $: transactions = data.allTransactions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).filter((transaction) => transaction.sessionId === data.sessionID && !transaction.isDeleted)

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }



</script>
<div class="flex flex-col p-4 gap-4 w-full">
    <Table.Root>
        <Table.Caption>
            Transaktionen
        </Table.Caption>
        <Table.Header>
            <Table.Head>Durchgeführt von</Table.Head>
            <Table.Head>Erstellt am</Table.Head>
            <Table.Head>Preis</Table.Head>
            <Table.Head>Pakete</Table.Head>
            <Table.Head>Chips</Table.Head>
            <Table.Head>Art</Table.Head>
        </Table.Header>
        <Table.Body>
            {#each (transactions) as transaction}
                <Table.Row>
                    <Table.Cell>{transaction.creator.name}</Table.Cell>
                    <Table.Cell>{getDateFormatted(new Date(transaction.createdAt))}</Table.Cell>
                    <Table.Cell>{transaction.isPurchase ? "": "-"}{
                            transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0) 
                        } Bombasten
                    </Table.Cell>
                    <Table.Cell>{transaction.bundles.map((bundle) => {
                            return bundle.bundle.name + " x" + bundle.amount.toString()
                        }).join(", ") || "-"}
                    </Table.Cell>
                    <Table.Cell>{transaction.chips.map((chip) => {
                            return chip.chip.value + " x" + chip.amount.toString()
                        }).join(", ") || "-"}
                    </Table.Cell>
                    <Table.Cell>{transaction.isPurchase ? "Einzahlung": "Abbuchung"}</Table.Cell>
                    <!--<Table.Cell><DeleteTransaction id={transaction.id}/></Table.Cell>-->
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>