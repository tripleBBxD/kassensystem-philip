<script lang="ts">
    import "../../../styles.css"
    import Button from "$lib/components/ui/button/button.svelte";
	import type { LayoutServerData } from "./$types";
	import { goto } from "$app/navigation";

    async function logout() {
        await fetch("/api/logout", {
            method: "PUT"
        })
        goto("/loggedout")
    }

    </script>
<div class="h-screen flex flex-row overflow-hidden w-screen">
    <aside class="flex flex-col gap-4 p-4 border-r-2 h-full w-svw max-w-36 justify-between transition-all duration-500 ease-in-out top-0 left-0">
        
        <div class="flex flex-col gap-4">
        <Button on:click={() => goto("/panels/admin/store")}>Kasse</Button>
        <Button on:click={() => goto("/panels/admin/setup")}>Konfiguration</Button>
        <Button on:click={() => goto("/panels/admin/transactions")}>Transaktionen</Button>
        </div>
        <Button on:click={logout}>Abmelden</Button>
    </aside>

        <slot></slot>   
</div>
