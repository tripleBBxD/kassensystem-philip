<script lang="ts">
        import { invalidateAll } from '$app/navigation';
import Button from '$lib/components/ui/button/button.svelte';
import prisma from '$lib/prisma/prisma';
import { Trash } from 'lucide-svelte';

export let id: number

async function deleteBundle(id: number) {
   await fetch("/api/deleteBundleById", {
        method: "POST",
        body: JSON.stringify({
            id: id
        })
   })
}

</script>
<Button on:click={() => {deleteBundle(id); invalidateAll()}} class="bg-transparent hover:bg-secondary">    
    <Trash class="stroke-primary"/>
</Button>