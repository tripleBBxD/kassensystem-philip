<script lang="ts">
	import { number } from 'zod';
	import Button from "$lib/components/ui/button/button.svelte";
	import * as FileSaver from 'file-saver';
    import * as XLSX from 'xlsx';
	import type { AllTransactions, ProductsWithTransactions } from "./+page.svelte";
	import Input from '$lib/components/ui/input/input.svelte';
	import type { Product } from '@prisma/client';
	import { writable } from 'svelte/store';

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    export let transactionsData: AllTransactions

    $: transactions.set(transactionsData)

    let transactions = writable(transactionsData)

    export let productsWithTransactions: ProductsWithTransactions

    let day = writable(0)


    function getTurnover(day: number) {

        return $transactions
            .filter((transaction) => transaction.createdAt.getDate() == day)
            .map((transaction) => transaction.products?.map((bundle) => bundle.product.price * bundle.amount)
            .reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val , 0)

    }
    

    function getDateFormatted(date: Date) {
        return date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'})
    }
    function generateExcelAndSave() {


        transactions.set($transactions
            
        )


        let transactionsAOA: String[][] = $transactions
                                            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                                            .filter((transaction) => {
                                                if (transaction.createdAt.getDate() == $day) {
                                                    console.log("a")
                                                    return true
                                                }
                                                else {
                                                    console.log("b")
                                                    return false
                                                }
                                            })
                                            .map((transaction) => {
                                                return [
                                                    transaction.price.toString(),
                                                    transaction.products.map((bundle) =>  (bundle.product.name + " x" + bundle.amount.toString())).join(", ") || "-",
                                                    getDateFormatted(transaction.createdAt)
                                                ] 
                                            })
        transactionsAOA.unshift(["Preis", "Produkte", "Datum"])

        let profitAOA: String[][] = [
            ["Tag", "Umsatz"],
            [ $day + ".07", getTurnover($day).toString() || "-"]  || "-",
        ]

        let productAOA: String[][] = productsWithTransactions.map((product) => [
            product.name,
            product.transactions
                        .filter((transaction) => {
                            if (transaction.transaction.createdAt.getDate() == $day) {
                                console.log("a")
                                return true
                            }
                            else {
                                console.log("b")
                                return false
                            }
                        })
                        .map((transaction) => transaction.amount).reduce((acc, val) => acc + val, 0)
                        .toString()
        ])
        productAOA.unshift(["Name", "Menge"])
        const productsSheet = XLSX.utils.aoa_to_sheet(productAOA)
        const transactionsSheet = XLSX.utils.aoa_to_sheet(transactionsAOA)
        const profitSheet = XLSX.utils.aoa_to_sheet(profitAOA)
        const wb = { Sheets: { 'transaktionen': transactionsSheet, "profite": profitSheet, "produkte": productsSheet }, SheetNames: ['transaktionen', "profite", "produkte"] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Transaktionen" + fileExtension);
    }
</script>
<div class="flex flex-row gap-4">  
    <Button on:click={generateExcelAndSave}>
        Excel generieren
    </Button>
    <Input bind:value={$day} type="number" placeholder="Tag"></Input>
</div>