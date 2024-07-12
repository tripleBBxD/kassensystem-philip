<script lang="ts">
	import type { PageServerData } from "./$types";
    import * as Table from "$lib/components/ui/table";
    export let data: PageServerData
	import type { User } from "@prisma/client";
	import DeleteUser from "./deleteUser.svelte";

    function sortChips(chips: User[]) {
        return chips.sort((a, b) => a.name.localeCompare(b.name))
    }

</script>
<Table.Root>
    <Table.Caption>Liste aller Chips</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Passwort</Table.Head>
            <Table.Head>Admin?</Table.Head>
            <Table.Head>Löschen</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each sortChips(data.users) as user}
            <Table.Row>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.password}</Table.Cell>
                <Table.Cell>{user.isAdmin ? "Ja" : "Nein"}</Table.Cell>
                <Table.Cell>
                    <DeleteUser id={user.id}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

