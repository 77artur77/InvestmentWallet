<script lang="ts">
    import {onMount} from "svelte";
    import CoinsList from "../../../lib/components/dashboard/Invest/CoinsList.svelte";
    import InvestmentList from "../../../lib/components/dashboard/wallet/InvestmentList.svelte";
    import LoadingIndicator from "../../../lib/components/LoadingIndicator.svelte";
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";
    let coins = []

    let response: CoinListResponse
    let isLoading: boolean = false
    let errorMessage: string = ""

    interface CoinListResponse {
        data: {
            id: number
            list: Coin[],
            state: string,
            type: string
        },
        status: string

    }

    interface Coin {
        balance: string
        currency: string
        seqNum: string
        type: string
    }

    async function getBalance() {
        isLoading = true
        errorMessage = ""
        try {
            let result = await fetch("/dashboard/wallet/coins-list-get")
            return await result.json()
        } catch (error) {
            errorMessage = error.toString()
        } finally {
            isLoading = false
        }
    }

    function getListWithCoins(response: CoinListResponse) {
        if(response === undefined || response === null) {
            console.log("getListWithCoins response undefined")
            return
        }
        if(response.data === undefined || response.data === null) {
            return
        }
        let listWithBalance = response.data.list.filter((coin) => {
            if(coin.balance !== "0") {
                return coin
            }
        })
        console.log("response.data.list", response.data.list)
        console.log("listWithBalance", listWithBalance)
        return listWithBalance
    }

    $: {
        console.log("response details", response)
        coins = getListWithCoins(response)
        console.log("COINS", coins)
    }
    onMount(async() => {
        response = await getBalance()
        console.log("response", response)
    })
</script>

<main>
    {#if isLoading}
        <LoadingIndicator/>
    {:else}
        <ErrorMessage errorMessage={errorMessage}/>
        <InvestmentList coins={coins}/>
    {/if}
</main>