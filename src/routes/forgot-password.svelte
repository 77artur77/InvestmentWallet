<script lang="ts">
    import {goto} from "$app/navigation"
    import {getAuth, sendPasswordResetEmail} from "firebase/auth";
    import LoadingIndicator from "../lib/components/LoadingIndicator.svelte";
    import ErrorMessage from "../lib/components/ErrorMessage.svelte";


    let email = ""
    let password = ""
    let errorMessage = ""
    let isLoading = false
    let emailSend = false

    const auth = getAuth()


    function sendResetPasswordEmail() {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                emailSend = true
            })
            .catch((error) => {
                errorMessage = error.code
            })
    }
</script>


<section class="flex flex-col bg-blue-200 p-10">
    <h1 class="flex justify-center text-xl font-bold mb-2">Forgot password</h1>
    <div class="flex flex-row items-center">
        {#if isLoading}
            <LoadingIndicator/>
        {/if}
        <ErrorMessage errorMessage={errorMessage}/>
    </div>
    <div class="flex flex-col">
        <input placeholder="email" bind:value={email}/>
        <button on:click={sendResetPasswordEmail}>send</button>
        {#if emailSend}
            <p class="text-green-500">email send</p>
        {/if}
    </div>
</section>