<script lang="ts">
	import { number } from 'zod';
	import Button from "$lib/components/ui/button/button.svelte";
	import * as FileSaver from 'file-saver';
    import * as XLSX from 'xlsx';
	import type { AllTransactions } from "./+page.svelte";
	import Input from '$lib/components/ui/input/input.svelte';
	import type { Product } from '@prisma/client';

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    export let transactions: AllTransactions

    let day: number
    let product: Product

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
            .filter((transaction) => transaction.createdAt.getDate() == day)
            .map((transaction) => transaction.products?.map((bundle) => bundle.product.price * bundle.amount)
            .reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val , 0)

    }
    

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }
    function generateExcelAndSave() {


        transactions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        console.log(day)
        let transactionsAOA: String[][] = transactions.filter((transaction) => transaction.createdAt.getDate() === day).map((transaction) => {
            return [
                transaction.products?.map((bundle) => bundle.product.price * bundle.amount).reduce((acc, val) => acc + val, 0).toString(),
                transaction.products.map((bundle) =>  (bundle.product.name + " x" + bundle.amount.toString())).join(", ") || "-",
                getDateFormatted(transaction.createdAt)
            ] 
        })
        transactionsAOA.unshift(["Preis", "Produkte", "Datum"])

        let profitAOA: String[][] = [
            ["Tag", "Umsatz"],
            [ day + ".07", getTurnover(day).toString() || "-"]  || "-",
        ]

        let productAOA: String[][] = []

        const transactionsSheet = XLSX.utils.aoa_to_sheet(transactionsAOA)
        const profitSheet = XLSX.utils.aoa_to_sheet(profitAOA)
        const wb = { Sheets: { 'transaktionen': transactionsSheet, "profite": profitSheet }, SheetNames: ['transaktionen', "profite"] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Transaktionen" + fileExtension);
    }
</script>
<div class="flex flex-row gap-4">  
    <Button on:click={generateExcelAndSave}>
        Excel generieren
    </Button>
    <Input bind:value={day} type="number" placeholder="Tag"></Input>
</div>