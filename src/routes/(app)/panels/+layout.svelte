<script lang="ts">
    import "../../styles.css"
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

<nav>
    <div class="w-screen bg-gray-900 flex justify-end p-4 align-middle">

            <Button on:click={logout}>Abmelden</Button>
        
    </div>
</nav>

<slot></slot>