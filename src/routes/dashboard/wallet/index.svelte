
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js">
    import {onMount} from "svelte";

    import sha256 from 'crypto-js/sha256';
    import hmacSHA512 from 'crypto-js/hmac-sha512';
    import hmacSHA512 from 'crypto-js/hmac-sha256';
    import Base64 from 'crypto-js/enc-base64';

    export let huobiCommon;
    // var hash = hmacSHA512
    // hash.


    export async function get() {
        const baseUrl = "https://api.huobi.pro/"
        const endpoint = "v1/order/orders"
        const accessKeyId = "yh4fhmvs5k-3bd3a0a7-a2f59525-aacf6"
        const signatureMethod = "HmacSHA256"
        const signatureVersion = "2"
        const date = new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace(":", "%3A").replace(":", "%3A")
        const orderId = "1"
        const signature = ""
        const url = `${baseUrl}${endpoint}?AccessKeyId=${accessKeyId}&SignatureMethod=${signatureMethod}&SignatureVersion=${signatureVersion}
        &Timestamp=${date}&order-id=${orderId}$Signature=${signature}`


        const url2 = `https://api.huobi.pro/v1/common/`
        console.log(url)
        const res = await fetch(url)
        const huobiCommon = await res.json()




        if (huobiCommon) {
            return {
                body: { huobiCommon }
            };
        }

        return {
            status: 404
        };
    }


    onMount(() => {
        huobiCommon = get()
        console.log("huobiCommon", huobiCommon)
    })

</script>

<p>{huobiCommon}</p>
