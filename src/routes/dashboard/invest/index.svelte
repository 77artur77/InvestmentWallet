<script lang="ts">
    import {onMount} from "svelte";
    import CoinsList from "../../../lib/components/dashboard/Invest/CoinsList.svelte";
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";
    import LoadingIndicator from "../../../lib/components/LoadingIndicator.svelte";

    let currencies: Currency[] = []
    let currencyResponse: CurrencyResponse
    let isLoading: boolean = false
    let errorMessage: string = ""

    $: {
        currencies = getListOfCurrencies(currencyResponse)
        console.log("List currencies", currencies)
    }

    interface Currency {
        amount: number
        ask: number,
        askSize: number,
        bid: number,
        bidSize: number,
        close: number,
        count: number,
        high: number,
        low: number,
        open: number,
        symbol: string,
        vol: number
    }

    interface CurrencyResponse {
        data: Currency[],
        status: string,
        ts: number
    }

    async function getAvailableCurrencies(): Promise<CurrencyResponse> {
        isLoading = true
        errorMessage = ""
        try {
            let result = await fetch("/dashboard/invest/currencies-get")
            return await result.json()
        } catch (error) {
            errorMessage = error.toString()
        } finally {
            isLoading = false
        }
    }

    function getListOfCurrencies(response: CurrencyResponse): Currency[] {
        if(response === undefined || response === null) {
            console.log("getListWithCoins response undefined")
            return
        }
        let currencies = response.data
        console.log("response", response)
        return currencies
    }

    onMount(async() => {
        currencyResponse = await getAvailableCurrencies()
    })
</script>

<main>
    {#if isLoading}
        <LoadingIndicator/>
    {:else}
        <ErrorMessage errorMessage={errorMessage}/>
        <CoinsList coins={currencies}/>
    {/if}
</main>