<script lang="ts">
	import PrintButton from './PrintButton.svelte';
    import AddUser from "$lib/components/panelComponents/addUser/addUser.svelte";
    import AddChip from "$lib/components/panelComponents/addChip/addChip.svelte";
    import AddBundle from "$lib/components/panelComponents/addBundle/addBundle.svelte";
	import type { PageData } from "./$types";
    import { Toaster } from "svelte-sonner";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
	import type { Bundle } from "@prisma/client";

    export let data: PageData

    type AllTransactions = typeof data.allTransactions

    let transactions: AllTransactions

    $: transactions = data.allTransactions

    function getDateFormatted(date: Date) {
        return (date.getDay() + "." + date.getMonth() + ", " + date.getHours() +":" + date.getMinutes())
    }


</script>
<div class="flex flex-col p-4 gap-4 w-full">
    <div>
        <PrintButton/>
    </div>

    <Table.Root>
        <Table.Caption>
            Transaktionen
        </Table.Caption>
        <Table.Header>
            <Table.Head>Durchgeführt von</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Erstellt am</Table.Head>
            <Table.Head>Preis</Table.Head>
            <Table.Head>Pakete</Table.Head>
            <Table.Head>Chips</Table.Head>
        </Table.Header>
        <Table.Body>
            {#each (transactions) as transaction}
                <Table.Row>
                    <Table.Cell>{transaction.creator.name}</Table.Cell>
                    <Table.Cell>{transaction.isPurchase ? "Gekauft": "Gelöscht"}</Table.Cell>
                    <Table.Cell>{getDateFormatted(new Date(transaction.createdAt))}</Table.Cell>
                    <Table.Cell>{
                            transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0) 
                        } Bombasten
                    </Table.Cell>
                    <Table.Cell>{transaction.bundles.map((bundle) => {
                            return bundle.bundle.name + " x" + bundle.amount.toString()
                        }).join(", ")}
                    </Table.Cell>
                    <Table.Cell>{transaction.chips.map((chip) => {
                            return chip.chip.value + " x" + chip.amount.toString()
                        }).join(", ")}
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>