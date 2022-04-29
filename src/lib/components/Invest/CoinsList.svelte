<script lang="ts">
    import SingleCoin from "./SingleCoin.svelte";

    export let coins = []
    export let filteredCoins = []
    let searchElement = ""

    $: {
        searchCoin(coins, searchElement)
    }

    function searchCoin(coins, searchElement)  {
        filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(searchElement))
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