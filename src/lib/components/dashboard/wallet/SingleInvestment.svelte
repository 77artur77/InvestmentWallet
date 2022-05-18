<script lang="ts">
    import {goto} from "$app/navigation";
    export let index = 1
    export let coin: coin

    interface coin {
        balance: string
        currency: string
        seqNum: string
        type: string
    }
</script>

<div class="flex justify-between bg-blue-400 items-center px-4">
    <p>{index}</p>
    <p>{coin.currency}</p>
    <p>{coin.balance}</p>
    <button class="m-4 p-2 bg-gray-400" on:click={() => goto(`https://www.coingecko.com/en/coins/`)}>Details</button>
    <button class="m-4 p-2 bg-green-700" on:click={() => goto(`https://www.huobi.com/en-us`)}>Buy</button>
    <button class="m-4 p-2 bg-red-700" on:click={() => goto("https://www.huobi.com/en-us")}>Sell</button>
</div>