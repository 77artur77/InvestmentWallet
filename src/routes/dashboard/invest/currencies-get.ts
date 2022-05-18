import {constData} from "../../consts";
import {HuobiClient} from "../wallet/huobi-client";

export async function get(request) {
    // TODO: authorization
    const client = HuobiClient.default(constData.host, constData.accessKey, constData.secretKey)
    let response = await client.getAvailableCurrencies()
    return {
        body: response
    };
}
