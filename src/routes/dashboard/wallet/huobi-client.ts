import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export class requestBuilder {
    url: string
    constructor(url) {
        this.url = url
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

export class urlBuilder {
    private endpoint: string
    private orderId: string
    private accessKeyId: string
    private secretKeyId: string
    private url: string

    private hostUrl: string = "api.huobi.pro"
    private signatureMethod: string = "HmacSHA256"
    private signatureVersion: string = "2"

    private currentDate: string = new Date(Date.now()).toISOString().slice(0, 19).replace(":", "%3A").replace(":", "%3A")

    constructor(endpoint, orderId, accessKeyId, secretKeyId) {
        this.endpoint = endpoint
        this.orderId = orderId
        this.accessKeyId = accessKeyId
        this.secretKeyId = secretKeyId
    }

    setEndpoint(endpoint) {
        this.endpoint = endpoint
    }

    setHostUrl(hostUrl) {
        this.hostUrl = hostUrl
    }

    getHostUrl() {
        return this.hostUrl
    }

    setSignatureMethod(signatureMethod) {
        this.signatureMethod = signatureMethod
    }

    getSignatureMethod() {
        return this.signatureMethod
    }

    setSignatureVersion(signatureVersion) {
        this.signatureMethod = signatureVersion
    }

    getSignatureVersion() {
        return this.signatureVersion
    }

    private buildParameters() {
        return `AccessKeyId=${this.accessKeyId}&SignatureMethod=${this.signatureMethod}&SignatureVersion=${this.signatureVersion}&Timestamp=${this.currentDate}&order-id=${this.orderId}`
    }

    private buildSignature() {
        const preSignedText = `GET\n${this.hostUrl}\n${this.endpoint}\n${this.buildParameters()}`
        const hash256 = hmacSHA256(preSignedText, this.secretKeyId);
        const base64 = Base64.stringify(hash256)
        return base64
    }

    private buildUrl() {
        let parameters = this.buildParameters()
        let signature = this.buildSignature()
        const url = `https://${this.hostUrl}${this.endpoint}?${parameters}&Signature=${signature}`
        this.url = url
    }

    getUrl () {
        this.buildUrl()
        return this.url
    }
}

export class Authentication {
    private accessKeyId: string
    private secretKeyId: string

    constructor(accessKeyId, secretKeyId) {
        this.accessKeyId = accessKeyId
        this.secretKeyId = secretKeyId
    }

    getAccessKeyId() {
        return this.accessKeyId
    }

    getSecretKeyId() {
        return this.secretKeyId
    }
}
