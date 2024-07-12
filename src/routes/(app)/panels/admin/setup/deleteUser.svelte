<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
import { Trash } from 'lucide-svelte';

export let id: number

async function deleteUser(id: number) {
    await fetch("/api/deleteUserById", {
        method: "POST",
        body: JSON.stringify({
            id: id
        })
   })
}
</script>
<Button on:click={() => {deleteUser(id); invalidateAll()}} class="bg-transparent hover:bg-secondary">    
        <Trash class="stroke-primary"/>
</Button>