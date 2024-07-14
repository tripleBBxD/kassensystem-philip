<script lang="ts">
	import { number } from 'zod';
	import Button from "$lib/components/ui/button/button.svelte";
	import * as FileSaver from 'file-saver';
    import * as XLSX from 'xlsx';
	import type { AllTransactions } from "./+page.svelte";

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    export let transactions: AllTransactions

    function invert(number: number, inverted: boolean) {
        if (inverted) {
            return -number
        }
        else {
            return number
        }
    }

    function getTurnover(day: number) {
        return transactions
            .filter((transaction) => transaction.createdAt.getDay() === day && transaction.isPurchase)
            .map((transaction) => transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val , 0)

    }

    function getExpenses(day: number) {
        return transactions
            .filter((transaction) => transaction.createdAt.getDay() === day && !transaction.isPurchase)
            .map((transaction) => transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val , 0)
    }
    

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }
    function generateExcelAndSave() {

        transactions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        let transactionsAOA: String[][] = transactions.filter((transactions) => !transactions.isDeleted).map((transaction) => {
            return [
                ((transaction.isPurchase ? "" : "-") + (+transaction.bundles?.map((bundle) => bundle.bundle.price * bundle.amount).reduce((acc, val) => acc + val, 0) + +transaction.chips?.map((chip) => chip.chip.value * chip.amount).reduce((acc, val) => acc + val, 0))).toString(),
                transaction.bundles.map((bundle) =>  (bundle.bundle.name + " x" + bundle.amount.toString())).join(", ") || "-",
                transaction.chips.map((chip) =>  (chip.chip.value + " x" + chip.amount.toString())).join(", ") || "-",
                transaction.isPurchase ? "Einzahlung": "Abbuchung",
                getDateFormatted(transaction.createdAt)
            ] 
        })
        transactionsAOA.unshift(["Preis", "Pakete", "Chips", "Art", "Datum"])

        let profitAOA: String[][] = [
            ["Tag", "Kosten", "Umsatz", "Gewinn"],
            ["14.07", getExpenses(14).toString() || "-", getTurnover(14).toString() || "-", (getTurnover(14) - getExpenses(14)).toString()]  || "-",
            ["15.07", getExpenses(15).toString() || "-", getTurnover(15).toString() || "-", (getTurnover(15) - getExpenses(15)).toString()]  || "-",
            ["16.07", getExpenses(16).toString() || "-", getTurnover(16).toString() || "-", (getTurnover(16) - getExpenses(16)).toString()]  || "-",
            ["17.07", getExpenses(17).toString() || "-", getTurnover(17).toString() || "-", (getTurnover(17) - getExpenses(17)).toString()]  || "-",
            ["18.07", getExpenses(18).toString() || "-", getTurnover(18).toString() || "-", (getTurnover(18) - getExpenses(18)).toString()]  || "-",
            ["19.07", getExpenses(19).toString() || "-", getTurnover(19).toString() || "-", (getTurnover(19) - getExpenses(19)).toString()]  || "-",
        ]

        const transactionsSheet = XLSX.utils.aoa_to_sheet(transactionsAOA)
        const profitSheet = XLSX.utils.aoa_to_sheet(profitAOA)
        const wb = { Sheets: { 'transaktionen': transactionsSheet, "profite": profitSheet }, SheetNames: ['transaktionen', "profite"] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Transaktionen" + fileExtension);
    }
</script>

<Button on:click={generateExcelAndSave}>
    Excel generieren
</Button>