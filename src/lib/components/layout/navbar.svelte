<script lang="ts">
    import {Routes} from "../../../routes/routes.ts";
    import {getAuth, signOut} from "firebase/auth";
    import {goto} from "$app/navigation";
    import {isLoggedIn} from "../../../routes/stores/authStore.js"

    function logout() {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                localStorage.removeItem("uid")
                goto(Routes.LOGIN)
            })
            .catch((error) => {
                console.error(error)
            })
    }
</script>

<ul class="flex flex-col bg-blue-300 gap-8 h-screen">
    <li class="mx-3 mt-28 ">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" href={Routes.WALLET}>Wallet</a>
    </li>
    <li class="mx-3">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" href={Routes.INVEST}>Invest</a>
    </li>
    <li class="mx-3">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" href={Routes.PROFILE}>Profile</a>
    </li>
    <li class="mx-3">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" href={Routes.HISTORY}>History</a>
    </li>
    <li class="mx-3">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" href={Routes.BILLING}>Billing</a>
    </li>
    <li class="mx-3 mt-28">
        <a class="flex font-bold bg-blue-400 hover:bg-blue-500 px-4 py-2 bg-red-500" on:click={logout} href={Routes.LOGOUT}>Logout</a>
    </li>
</ul>