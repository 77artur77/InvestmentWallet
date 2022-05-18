import {HuobiClient} from "./huobi-client";
import {constData} from "../../consts";

export async function get(request) {
    // TODO: authorization
    const client = HuobiClient.default(constData.host, constData.accessKey, constData.secretKey)
    let response = await client.getAccounts(constData.orderID)
    return {
        body: response
    };
}
