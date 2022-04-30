<script lang="ts">
    import {onMount} from "svelte";
    import CoinsList from "../../../lib/components/Invest/CoinsList.svelte";
    
    export let coinsList = []

    onMount(async () => {
        console.log("coinsList", coinsList)
    })


</script>
<main>
    <CoinsList coins={coinsList}/>
</main>