import {expect} from "@playwright/test";

const HuobiClient = require('../src/routes/dashboard/wallet/huobi-client')
const UrlBuilder = require('../src/routes/dashboard/wallet/huobi-client')
const Authentication = require('../src/routes/dashboard/wallet/huobi-client')

describe("Url builder", () => {
    it("onInstanceCreated", () => {
        const subject = new HuobiClient()
        expect(subject.onInstanceCreated)
    })
})