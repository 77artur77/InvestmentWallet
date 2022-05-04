<script lang="ts">
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {Routes} from "../../routes.ts";
    import {Authentication, HuobiClient, UrlBuilder} from "./huobi-client.ts";

    export let data
    let walletBalance = 0
    let walletBalanceChange = 0

    const host = "api.huobi.pro"
    const accessKeyId = "yh4fhmvs5k-3bd3a0a7-a2f59525-aacf6"
    const secretKey = "7822678b-d7a5b6dc-5e0afc87-61fca"
    const accountId = "9570946"
    const endpoint = "/v1/order/orders"
    const endpointID = "/v1/account/accounts"
    const endpointAccountBalance = "/v1/account/accounts/9570946/balance"
    const endpointHistory = "/v1/account/history?account-id=9570946"

    export let response
    async function getAccountID() {
        return await fetch('/dashboard/wallet')
    }

    export async function get(accountId: string, orderID: string) {
        const host = "api.huobi.pro"
        const accessKeyId = "yh4fhmvs5k-3bd3a0a7-a2f59525-aacf6"
        const secretKey = "7822678b-d7a5b6dc-5e0afc87-61fca"
        const client = HuobiClient.default(host, accessKeyId, secretKey)
        console.log("we are here")
        let response = await client.getBalance(accountId, orderID)

        return {
            status: 200,
            body: response
        };

    }

    onMount(() => {
        // response = getAccountID()
        response = get(accountId, "1")
        // <!--let client = HuobiClient.default(host, accessKeyId, secretKey)-->
        // <!--let huobiAccounts =  client.getAccountID("1")-->
        // <!--let huobiBalance = client.getBalance(accountId, "2")-->
        // <!--let huobiValution = client.getValuation()-->
        // <!--let huobiHistory = client.getAccountHistory(accountId)-->
        // <!--console.log("huobiAccountId", huobiAccounts)-->
        // console.log("huobiBalance", huobiBalance)
        // console.log("huobiValution", huobiValution)
        // console.log("huobiHistory", huobiHistory)
        console.log("item", response)

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

    <button class="p-2 bg-green-700" on:click={() => goto("https://www.huobi.com/en-us")}>Invest More</button>
    <button class="p-2 bg-yellow-300" on:click={() => goto(Routes.WALLET_DETAILS)}>Details</button>
</div>

