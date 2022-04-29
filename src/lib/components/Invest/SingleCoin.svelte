<script lang="ts">
    import {goto} from "$app/navigation";

    export let index = 1
    export let coin = {
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 40000,
        image: "https://assets.coingecko.com/coins/images/1/large/bi54321  §  asfgh4567890-07t6rewaq  xzx   aCSQVWBFEKL;'tL VCXZcoin.png?1547033579",
        price_change_percentage_24h: 0.41
    }
</script>

<div class="flex justify-between bg-blue-400 items-center px-4">
   <p>{index}</p>
   <p>{coin.name}</p>
   <img class="p-2" width="75" src="{coin.image}"/>
   <p>{coin.current_price}</p>
   <p>{coin.price_change_percentage_24h.toFixed(2)} %</p>
   <button class="m-4 p-2 bg-gray-400" on:click={() => goto(`https://www.coingecko.com/en/coins/${coin.id}`)}>Details</button>
   <button class="m-4 p-2 bg-green-700" on:click={() => goto("https://www.binance.com/en/markets")}>Buy</button>
</div>