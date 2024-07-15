<script lang="ts">
  import ChipTable from './ChipTable.svelte';

	import type { PageServerData } from "./$types";
    import type { PageServerData as ParentData}  from "../$types";
    import AddChip from "$lib/components/panelComponents/addChip/addChip.svelte";
	import { Toaster } from "svelte-sonner";
    import AddUser from "$lib/components/panelComponents/addUser/addUser.svelte"
    export let data: PageServerData
	import UserTable from './UserTable.svelte';
	import AddBundle from '$lib/components/panelComponents/addBundle/addBundle.svelte';

</script>

<div class="flex flex-row py-4 px-2 justify-start w-full">
    <div class="flex flex-col px-2 gap-2">
        <AddChip data={data.addChipSchema} buttonClass=""/>
        <ChipTable data={data}/>
    </div>
    <div class="flex flex-col px-2 gap-2">
        <AddUser data={data.addUserSchema} buttonClass=""/>
        <UserTable data={data}/>
    </div>
</div>
<Toaster />