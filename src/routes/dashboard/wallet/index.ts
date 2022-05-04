import {HuobiClient} from "./huobi-client";

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
