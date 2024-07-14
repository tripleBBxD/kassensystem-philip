<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import * as FileSaver from 'file-saver';
    import * as XLSX from 'xlsx';
	import type { AllTransactions } from "./+page.svelte";

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    export let transactions: AllTransactions
    

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }
    function generateExcelAndSave() {

        transactions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        const aoa: String[][] = transactions.filter((transactions) => !transactions.isDeleted).map((transaction) => {
            return [
                ((transaction.isPurchase ? "" : "-") + (+transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + +transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0))).toString(),
                transaction.bundles.map((bundle) =>  (bundle.bundle.name + " x" + bundle.amount.toString())).join(", ") || "-",
                transaction.chips.map((chip) =>  (chip.chip.value + " x" + chip.amount.toString())).join(", ") || "-",
                transaction.isPurchase ? "Einzahlung": "Abbuchung",
                getDateFormatted(transaction.createdAt)
            ] 
        })
        aoa.unshift(["Preis", "Pakete", "Chips", "Art", "Datum"])
        const workSheet = XLSX.utils.aoa_to_sheet(aoa)
        const wb = { Sheets: { 'transaktionen': workSheet }, SheetNames: ['transaktionen'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Transaktionen" + fileExtension);
    }
</script>

<Button on:click={generateExcelAndSave}>
    Excel generieren
</Button>