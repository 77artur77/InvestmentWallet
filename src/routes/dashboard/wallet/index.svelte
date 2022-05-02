<script>
    import {onMount} from "svelte";
    import {huobiAuthentication, huobiData} from "./huobi-client.ts";
    import {goto} from "$app/navigation";
    import {Routes} from "../../routes.ts";

    export let response
    let walletBalance = 0
    let walletBalanceChange = 0

    const accountId = "9570946"
    const endpoint = "/v1/order/orders"
    const endpointID = "/v1/account/accounts"
    const endpointAccountBalance = "/v1/account/accounts/9570946/balance"
    const endpointHistory = "/v1/account/history?account-id=9570946"
    const accessKeyId = "yh4fhmvs5k-3bd3a0a7-a2f59525-aacf6"
    const secretKey = "7822678b-d7a5b6dc-5e0afc87-61fca"

    let huobiClient = new huobiAuthentication("/v1/account/accounts", accessKeyId, secretKey)

    // export async function get() {
    //     const res = await fetch(huobiClient.buildUrl())
    //     const huobiCommon = await res.json()
    //     if (huobiCommon) {
    //         return {
    //             body: { huobiCommon }
    //         };
    //     }
    //
    //     return {
    //         status: 404
    //     }
    // }
    // export async function get() {
    //
    //     const idSpotHuobi = "9570946"
    //     const parameters = `AccessKeyId=${accessKeyId}&SignatureMethod=${signatureMethod}&SignatureVersion=${signatureVersion}&Timestamp=${date}&order-id=${orderId}`
    //     const preSignedText = `GET\n${hostUrl}\n${endpointID}\n${parameters}`
    //     const hash = hmacSHA256(preSignedText, secretKey);
    //     const base64 = Base64.stringify(hash)
    //     const url = `https://${hostUrl}${endpointID}?${parameters}&Signature=${base64}`
    //
    //     const urlObject = new huobiAuthentication(endpointID, accessKeyId, secretKey)
    //     const urlFromObject = urlObject.buildUrl()
    //     isTheSame(url, urlFromObject)
    //     console.log("url get", url)
    //     console.log("urlFromObject", urlFromObject)
    //     const res = await fetch(urlFromObject)
    //     const huobiCommon = await res.json()
    //
    //
    //     if (huobiCommon) {
    //         return {
    //             body: { huobiCommon }
    //         };
    //     }
    //
    //     return {
    //         status: 404
    //     };
    // }


    onMount(() => {
        response = huobiClient.get(huobiClient.buildUrl())

        console.log("build url", huobiClient.buildUrl())
        console.log("response", response)
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

