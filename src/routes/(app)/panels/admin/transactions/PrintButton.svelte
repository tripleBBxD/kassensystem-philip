<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import jsPDF from "jspdf";
    import autoTable from 'jspdf-autotable'

    const doc = new jsPDF()

   

    function showPDF() {
        window.print()
    }
</script>

<Button on:click={showPDF}>
    Ausdrucksseite
</Button>