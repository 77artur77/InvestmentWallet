<script lang="ts">
	import '../css/style.css';
	import {onMount} from "svelte";
	import {getAuth, onAuthStateChanged} from "firebase/auth";
	import {goto} from "$app/navigation";
	import Navbar from "$lib/components/layout/navbar.svelte"
    import app from "./firebase.js"
    import {isLoggedIn} from "../routes/stores/authStore.js"
    import {Routes} from "./routes.ts";


    onMount(() => {
		const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user && auth.currentUser.emailVerified) {
                console.log("Welcome in InvestmentWallet")
                isLoggedIn.update(() => true)
            } else {
                isLoggedIn.update(() => false)
                console.log("You must login")
                goto("/login")
            }
        } )
	})
</script>

<div class="grid grid-cols-10">
    {#if $isLoggedIn && window.location.href.includes(Routes.VERIFY) === false && window.location.href.includes(Routes.LOGIN) === false&& window.location.href.includes(Routes.SIGNUP) === false&& window.location.href.includes(Routes.FORGOT_PASSWORD) === false}
        <div class="col-span-1">
            <Navbar/>
        </div>
        <div class="col-span-9">
            <slot/>
        </div>
    {:else}
        <div class="col-span-10">
            <slot/>
        </div>
    {/if}
</div>

