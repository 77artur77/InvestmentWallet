<script lang="ts">
    import SingleInvestment from "./SingleInvestment.svelte";
    export let coins: coin[] = []

    let searchElement: string = ""
    let filteredCoins: coin[] = []

    interface coin {
        balance: string
        currency: string
        seqNum: string
        type: string
    }

    function searchCoin(coins: coin[], searchElement: string)  {
        filteredCoins = coins.filter((coin) => coin.currency.toLowerCase().includes(searchElement))
    }

    $: {
        console.log("filtered", filteredCoins)
        searchCoin(coins, searchElement)
    }
</script>

<section>
    <div class="bg-blue-200 m-2 p-2 border-2">
        <input class="bg-red-200" placeholder="coin" bind:value={searchElement}/>
    </div>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between bg-red-300 items-center px-4">
            <p>index</p>
            <p>Name</p>
            <p>Balance</p>
            <button class="m-4 p-2 bg-gray-400" on:click={() => window.location.reload()}>Refresh</button>
            <button class="m-4 p-2 " ></button>
            <button class="m-4 p-2 " ></button>
        </div>
        {#each filteredCoins as coin, index}
            <SingleInvestment coin={coin} index={index + 1}/>
        {/each}
    </div>
</section>