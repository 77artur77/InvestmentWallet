<script lang="ts">
    import {goto} from "$app/navigation";

    export let index = 1
    export let coin: Currency

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
</script>

<div class="flex justify-between bg-blue-400 items-center px-4">
   <p>{index}</p>
   <p>{coin.symbol}</p>
   <p>{coin.bid}</p>
   <button class="m-4 p-2 bg-green-700" on:click={() => goto(`https://www.coingecko.com/en/coins/`)}>Details</button>
   <button class="m-4 p-2 bg-green-700" on:click={() => goto(`https://www.coingecko.com/en/coins/}`)}>Buy</button>
   <button class="m-4 p-2 bg-red-700" on:click={() => goto("https://www.binance.com/en/markets")}>Sell</button>
</div>