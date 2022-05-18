<script lang="ts">
    import {onMount} from "svelte";
    import LoadingIndicator from "../../../lib/components/LoadingIndicator.svelte";
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";

    let historyAccount: HistoryResponse[] = []
    let errorMessage: string = ""
    let isLoading: boolean = false
    let history: Data[] = [{accountID: 1233, currency: "Usd", recordID: 12, transactAmt: "123", availBalance: "sadad", acctBalance: "asda", transactTime: 23, transactType: 'ss'},
        {accountID: 1233, currency: "Usd", recordID: 12, transactAmt: "123", availBalance: "sadad", acctBalance: "asda", transactTime: 23, transactType: 'ss'},
        {accountID: 1233, currency: "Usd", recordID: 12, transactAmt: "123", availBalance: "sadad", acctBalance: "asda", transactTime: 23, transactType: 'ss'},]
    interface HistoryResponse {
        status: string,
        data: Data[],
        nextID: number
    }

    interface Data {
        accountID: number,
        currency: string,
        recordID: number,
        transactAmt: string,
        transactType: string,
        availBalance: string,
        acctBalance: string,
        transactTime: number
    }

    async function getAccountHistory() {
        isLoading = true
        errorMessage = ""
        try {
            let result = await fetch("/dashboard/history/history-get")
            return await result.json()
        } catch (error) {
            errorMessage = error.toString()
        } finally {
            isLoading = false
        }
    }

    $: {
        console.log("historyAccount lenght asdasd", history.length)
    }
    onMount(async() => {
        historyAccount = await getAccountHistory()
    })
</script>

<div>
    {#if isLoading}
        <LoadingIndicator/>
    {:else}
        <ErrorMessage errorMessage={errorMessage}/>
        {#if history.length > 0}
            {#each history as his}
                <div class="flex gap-2 my-2 bg-red-200">
                    <p>{his.accountID}</p>
                    <p>{his.currency}</p>
                    <p>{his.recordID}</p>
                    <p>{his.transactAmt}</p>
                    <p>{his.transactType}</p>
                    <p>{his.availBalance}</p>
                    <p>{his.acctBalance}</p>
                    <p>{his.transactTime}</p>
                </div>
            {/each}
        {:else }
            <p>You don't have history</p>
        {/if}
    {/if}

</div>