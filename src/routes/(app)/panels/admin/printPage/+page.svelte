<script lang="ts">
    import AddUser from "$lib/components/panelComponents/addUser/addUser.svelte";
    import AddChip from "$lib/components/panelComponents/addChip/addChip.svelte";
    import AddBundle from "$lib/components/panelComponents/addBundle/addBundle.svelte";
	import type { PageData } from "./$types";
    import { Toaster } from "svelte-sonner";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
	import type { Bundle } from "@prisma/client";
    import * as Select from "$lib/components/ui/select";

    export let data: PageData

    type AllTransactions = typeof data.allTransactions

    let transactions: AllTransactions

    $: transactions = data.allTransactions

    function getDateFormatted(date: Date) {
        return (date.getDay() + "." + date.getMonth() + ", " + date.getHours() +":" + date.getMinutes())
    }

    let date: number




</script>
<div class="flex flex-col p-4 gap-4 w-full">
    <div>
        <Select.Root>
            <Select.Trigger>
                <Select.Value placeholder="Datum"/>
            </Select.Trigger>
            <Select.Content>
                <Select.Label>Datum</Select.Label>
                <Select.Item value="15" label="15.07"></Select.Item>
                <Select.Item value="16" label="16.07"></Select.Item>
                <Select.Item value="17" label="17.07"></Select.Item>
                <Select.Item value="18" label="18.07"></Select.Item>
                <Select.Item value="19" label="19.07"></Select.Item>
            </Select.Content>
        </Select.Root>
    </div>

    <Table.Root class="">
        <Table.Caption>
            Transaktionen
        </Table.Caption>
        <Table.Header>
            <Table.Head>Preis</Table.Head>
            <Table.Head>Pakete</Table.Head>
            <Table.Head>Chips</Table.Head>
            <Table.Head>Datum</Table.Head>
        </Table.Header>
        <Table.Body>
            {#each (transactions) as transaction}
                <Table.Row>
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
                    <Table.Cell>{getDateFormatted(new Date(transaction.createdAt))}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>