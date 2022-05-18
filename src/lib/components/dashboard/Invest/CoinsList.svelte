<script lang="ts">
    import SingleCoin from "./SingleCoin.svelte";
    import ErrorMessage from "../../ErrorMessage.svelte";

    export let coins: Currency[] = []
    let filteredCoins: Currency[] = []
    let searchElement: string = ""

    $: {
        searchCoin(coins, searchElement)
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

    function searchCoin(coins: Currency[], searchElement: string) {
        filteredCoins = coins.filter((coin) => coin.symbol.toLowerCase().includes(searchElement))
    }
</script>

<section>
    <div class="bg-blue-200 m-2 p-2 border-2">
        <input class="bg-red-200" placeholder="coin" bind:value={searchElement}/>
    </div>
    <div class="flex flex-col gap-4">
        {#each filteredCoins as coin, index}
            <SingleCoin index={index + 1} coin={coin}/>
        {/each}
    </div>
</section>