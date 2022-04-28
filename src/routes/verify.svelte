<script lang="ts">
    import {goto} from "$app/navigation"
    import {getAuth, sendEmailVerification} from "firebase/auth";
    import LoadingIndicator from "../lib/components/LoadingIndicator.svelte";
    import ErrorMessage from "../lib/components/ErrorMessage.svelte";
    import {Routes} from "./routes.ts";


    let errorMessage = ""
    let isLoading = false
    const auth = getAuth()
    let emailVerified = false

    $:{
        console.log("auth.currentUserss",  auth.currentUser)
        if(auth.currentUser !== null) {
            if(emailVerified != null) {
                emailVerified = auth.currentUser.emailVerified
            }
        }
    }

    function resendEmailVerify() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
            })
            .catch((error) => {
                errorMessage = error.code
            })
    }

</script>


<main class="flex flex-col bg-blue-200 p-10">
    <section class="m-10 bg-red-500">
        <h1 class="flex justify-center text-xl font-bold mb-2">Sign Up</h1>
        <div class="flex flex-row items-center">
            {#if isLoading}
                <LoadingIndicator/>
            {/if}
            <ErrorMessage errorMessage={errorMessage}/>
        </div>

        {#if emailVerified}
            <p class="text-center text-green"> Your account is verified <a class="font-bold red-500" href={Routes.LOGIN}>Go to login</a></p>
        {:else}
            <p class="text-center"> We sent verification link to your email address, please click on it and verify email.</p>
            <button on:click={resendEmailVerify}>Resend code</button>
        {/if}
    </section>
</main>