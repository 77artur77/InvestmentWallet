<script lang="ts">
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {Routes} from "../../routes.ts";
    import LoadingIndicator from "../../../lib/components/LoadingIndicator.svelte";
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";

    let walletBalance: string
    let accountsResponse: AccountsResponse
    let spotAccountID: number
    let valuationAccount: ValuationAccount
    let errorMessage: string = ""
    let isLoading: boolean = false

    $: {
        walletBalance = getBalanceUSD(valuationAccount)
        spotAccountID = getSpotAccountId(accountsResponse)
        console.log("valuation", valuationAccount)
        console.log("walletBalance", walletBalance)
        console.log("accounts", accountsResponse)
        console.log("spotAccountID", spotAccountID)
    }

    interface ValuationAccount {
        code: number,
        data: {
            balance: string,
            timestamp: number
        },
        ok: boolean
    }

    interface Account {
        id: number,
        state: string,
        subtype: string,
        type: string,
    }

    interface AccountsResponse {
        data: Account[],
        ok: boolean,
    }

    async function getAccounts() {
        isLoading = true
        errorMessage = ""
        try {
            let result = await fetch("/dashboard/wallet/balance-get")
            return await result.json()
        } catch (error) {
            errorMessage = error.toString()
        } finally {
            isLoading = false
        }
    }

    function getSpotAccountId(accounts: AccountsResponse): number {
        if(accounts === undefined || accounts === null) {
            return
        }
        if(accounts.data === undefined || accounts.data === null) {
            return
        }
        let availableAccounts: Account[] = accounts.data
        let spotAccount = availableAccounts.find((element) => {
            if(element.type === "spot") {
                return element.type
            }
        })
        return spotAccount.id
    }

    async function getValuationAccount() {
        isLoading = true
        errorMessage = ""
        try {
            let result = await fetch("/dashboard/wallet/valuation-get")
            return await result.json()
        } catch (error) {
            errorMessage = error.toString()
        }
        finally {
            isLoading = false
        }
    }

    function getBalanceUSD(valuationAccount: ValuationAccount): string {
        if(valuationAccount === undefined || valuationAccount === null){
            return "0"
        }
        if(valuationAccount.code !== 200){
            console.log("valuation code !== 200")
            return "0"
        }
        return valuationAccount.data.balance
    }

    onMount(async () => {
        valuationAccount = await getValuationAccount()
        accountsResponse = await getAccounts()
    })
</script>

{#if isLoading}
    <LoadingIndicator/>
{:else}
    <div class="flex flex-col gap-4 items-center mx-auto s w-80 h-80 bg-blue-200">
        <p class="p-2">Your wallet</p>
        <ErrorMessage errorMessage={errorMessage}/>
        <div class="w-full flex justify-center p-2 bg-blue-500" >
            <p>Your balance: {walletBalance} USD</p>
        </div>
        <button class="p-2 bg-green-700" on:click={() => goto("https://www.huobi.com/en-us")}>Invest More</button>
        <button class="p-2 bg-yellow-300" on:click={() => goto(Routes.WALLET_DETAILS)}>Details</button>
    </div>
{/if}

