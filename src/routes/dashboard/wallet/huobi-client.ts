import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export class huobiAuthentication {
    endpoint: string
    accessKeyId: string
    secretKeyId: string

    hostUrl: string = "api.huobi.pro"
    signatureMethod: string = "HmacSHA256"
    signatureVersion: string = "2"
    orderId: string = "1"
    currentDate: string = new Date(Date.now()).toISOString().slice(0, 19).replace(":", "%3A").replace(":", "%3A")

    constructor(endpoint, accessKeyId, secretKetId) {
        this.endpoint = endpoint;
        this.accessKeyId = accessKeyId;
        this.secretKeyId = secretKetId;
    }

    // private getHostUrl() {
    //     return this.hostUrl
    // }
    //
    // private getSignatureMethod() {
    //     return this.signatureMethod
    // }
    //
    // private getSignatureVersion() {
    //     return this.signatureVersion
    // }
    //
    // private getCurrentDate() {
    //     return this.currentDate
    // }

    private buildParameters() {
        return `AccessKeyId=${this.accessKeyId}&SignatureMethod=${this.signatureMethod}&SignatureVersion=${this.signatureVersion}&Timestamp=${this.currentDate}&order-id=${this.orderId}`
    }

    private  buildSignature() {
        const preSignedText = `GET\n${this.hostUrl}\n${this.endpoint}\n${this.buildParameters()}`
        const hash256 = hmacSHA256(preSignedText, this.secretKeyId);
        const base64 = Base64.stringify(hash256)
        return base64
    }

    buildUrl() {
        let parameters = this.buildParameters()
        let signature = this.buildSignature()
        const url = `https://${this.hostUrl}${this.endpoint}?${parameters}&Signature=${signature}`
        return url
    }

     async get(url) {
        const res = await fetch(url)
        const data = await res.json()
        if (data) {
            return {
                body: { data }
            };
        }

        return {
            status: 404
        }
    }
}


