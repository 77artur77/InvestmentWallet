<script>
    import {onMount} from "svelte";
    import {Authentication, requestBuilder, urlBuilder} from "./huobi-client.ts";
    import {goto} from "$app/navigation";
    import {Routes} from "../../routes.ts";
    import {u} from "../../../../.svelte-kit/output/client/_app/chunks/index-dd45c2ae.js";

    export let data
    let walletBalance = 0
    let walletBalanceChange = 0

    const accountId = "9570946"
    const endpoint = "/v1/order/orders"
    const endpointID = "/v1/account/accounts"
    const endpointAccountBalance = "/v1/account/accounts/9570946/balance"
    const endpointHistory = "/v1/account/history?account-id=9570946"
    const accessKeyId = "yh4fhmvs5k-3bd3a0a7-a2f59525-aacf6"
    const secretKey = "7822678b-d7a5b6dc-5e0afc87-61fca"


    let auth = new Authentication(accessKeyId, secretKey)
    let urlBuild = new urlBuilder(endpointAccountBalance, "1", auth.getAccessKeyId(), auth.getSecretKeyId())
    let url = urlBuild.getUrl()
    let requestBuild = new requestBuilder(url)
    data = requestBuild.get(url)

    onMount(() => {
        console.log("data", data)
    })
</script>

<div class="flex flex-col gap-4 items-center mx-auto my-auto w-80 h-80 bg-blue-200">
    <p class="p-2">Your wallet</p>
    <div class="w-full flex justify-center p-2 bg-blue-500" >
        <p>Your balance: {walletBalance}</p>
    </div>
    <div class="w-full flex justify-center p-2 bg-blue-500">
        <p>Change (24h): {walletBalanceChange}</p>
    </div>

    <button class="p-2 bg-green-700" on:click={() => goto("https://www.binance.com/en/markets")}>Invest More</button>
    <button class="p-2 bg-yellow-300" on:click={() => goto(Routes.WALLET_DETAILS)}>Details</button>
</div>

