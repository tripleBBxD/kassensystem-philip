<script lang="ts" context="module">
    export let data: PageData
    export type AllTransactions = typeof data.allTransactions
    export type ProductsWithTransactions = typeof data.productsWithTransactions
</script>

<script lang="ts">
	import PrintButton from './PrintButton.svelte';
	import type { PageData } from "./$types";
    import * as Table from "$lib/components/ui/table";
	import DeleteTransaction from './DeleteTransaction.svelte';

    export let data: PageData


    let transactions

    $: transactions = data.allTransactions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }


</script>
<div class="flex flex-col p-4 gap-4 w-full">
    <div>
        <PrintButton transactionsData={data.allTransactions} productsWithTransactions={data.productsWithTransactions}/>
    </div>

    <Table.Root>
        <Table.Caption>
            Transaktionen
        </Table.Caption>
        <Table.Header>
            <Table.Head>Durchgeführt von</Table.Head>
            <Table.Head>Durchgeführt am</Table.Head>
            <Table.Head>Preis</Table.Head>
            <Table.Head>Produkte</Table.Head>
        </Table.Header>
        <Table.Body>
            {#each (transactions) as transaction}
                <Table.Row>
                    <Table.Cell>{transaction.creator.name}</Table.Cell>
                    <Table.Cell>{getDateFormatted(new Date(transaction.createdAt))}</Table.Cell>
                    <Table.Cell>{
                            transaction.price
                        } Bombasten
                    </Table.Cell>
                    <Table.Cell>{transaction.products.map((product) => {
                            return product.product.name + " x" + product.amount.toString()
                        }).join(", ") || "-"}
                    </Table.Cell>
                    <!-- <Table.Cell><DeleteTransaction id={transaction.id}/></Table.Cell> -->
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>