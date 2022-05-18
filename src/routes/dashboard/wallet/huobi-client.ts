import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';


interface HuobiRequest {
    method: string
    host: string
    path: string
    parameters: string
}

export class HuobiClient {
    authentication: Authentication
    urlBuilder: UrlBuilder

    constructor(authentication: Authentication, urlBuilder: UrlBuilder) {
        this.authentication = authentication
        this.urlBuilder = urlBuilder
    }

    static  default(host: string, accessKey: string, secretKey: string): HuobiClient {
        return new HuobiClient(
            new Authentication(secretKey),
            new UrlBuilder(host, accessKey)
        )
    }

    async getAccounts(orderID: string): Promise<string> {
        const path = "/v1/account/accounts"
        const parameters = {
            'order-id': orderID
        };
        let request = this.urlBuilder.build("GET", path, parameters);
        return this.makeRequest(request)
    }

    async getBalance(accountId: string, orderID: string): Promise<string> {
        const path = `/v1/account/accounts/${accountId}/balance`
        const parameters = {
            'order-id': orderID
        };
        let request = this.urlBuilder.build("GET", path, parameters);
        return this.makeRequest(request)
    }

     async getValuationUSD(): Promise<string> {
        const path = `/v2/account/asset-valuation`
        const parameters = {
            "accountType": "spot",
            "valuationCurrency": "USD"
        };
        let request = this.urlBuilder.build("GET", path, parameters);
        return this.makeRequest(request)
    }

     async getAccountHistory(accountId: string): Promise<string> {
            const path = `/v1/account/history`
            const parameters = {
                "account-id": accountId
            };
            let request = this.urlBuilder.build("GET", path, parameters);
            console.log("request history", request)
            return this.makeRequest(request)
        }

     async getAvailableCurrencies(): Promise<string> {
            const path = `/market/tickers`
            const parameters = {
            };
            let request = this.urlBuilder.build("GET", path, parameters);
            console.log("getAvailableCurrencies", request)
            return this.makeRequest(request)
        }


    async makeRequest(request: HuobiRequest): Promise<any> {
        const signedRequest = this.authentication.sign(request)
        let response = await fetch(`https://${signedRequest.host}${signedRequest.path}?${signedRequest.parameters}`)
        let responseJson = response.json()
        return await responseJson
    }
}


export class Authentication {
    secretKey: string

    constructor(secretKey: string) {
        this.secretKey = secretKey
    }

    sign(request: HuobiRequest): HuobiRequest {
        const wholeUrl = `${request.method}\n${request.host}\n${request.path}\n${request.parameters}`
        const signedHash256 = hmacSHA256(wholeUrl, this.secretKey);
        const signedBase64 = Base64.stringify(signedHash256)
        request.parameters = request.parameters + "&Signature=" + signedBase64
        console.log("request", JSON.stringify(request))
        return request
    }
}

export class UrlBuilder {
    host: string
    accessKey: string

    constructor(host: string, accessKey: string) {
        this.host = host
        this.accessKey = accessKey
    }

    build(method: string, path: string, parameters: Record<string, string>): HuobiRequest {
        return {
            method: method,
            host: this.host,
            path: path,
            parameters: this.parseParameters(parameters)
        }
    }

    private parseParameters(parameters: Record<string, string>): string {
        let params2: Record<string, string> = {}
        params2['AccessKeyId'] = this.accessKey
        params2['SignatureMethod'] = 'HmacSHA256'
        params2['SignatureVersion'] = '2'
        // parameters['Timestamp'] = new Date(Date.now()).toISOString().slice(0, 19).replace(":", "%3A").replace(":", "%3A")
        params2['Timestamp'] = new Date(Date.now()).toISOString().slice(0, 19)
        params2 = {...params2,
            ...parameters}
        let params: string[] = []

        for (let parametersKey in params2) {
            params.push(parametersKey + '=' + encodeURIComponent(params2[parametersKey]))
        }
        const paramsString = params.join("&")

        return paramsString
    }

}
