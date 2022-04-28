<script lang="ts">
    import {goto} from "$app/navigation"
    import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
    import {Routes} from "../../../routes/routes.ts";
    import LoadingIndicator from "../LoadingIndicator.svelte";
    import ErrorMessage from "../ErrorMessage.svelte";

    let email = ""
    let password = ""
    let repeatPassword = ""
    let errorMessage = ""
    let isLoading = false

    const auth = getAuth()

    function signUp() {
        errorMessage = ""
        if(email.length === 0 || password.length === 0 || repeatPassword.length === 0) {
            errorMessage = "Enter email, password and repeat password"
            return
        }
        if(email.includes("@") == false && email.includes(".") == false) {
            errorMessage = "Incorrect Email"
            return
        }
        if(password.length < 6) {
            errorMessage = "Passwords must be at least 6 characters"
            return
        }
        if(password !== repeatPassword) {
            errorMessage = "Password and repeat password aren't the same"
            return
        }
        isLoading = true
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("sign up auth.currentUser",auth.currentUser)
                sendEmailVerify()
            })
            .catch((error) => {
                if(error.code == "auth/email-already-in-use") {
                    errorMessage = "Email is used"
                    return
                }
                errorMessage = error.code
            })
        isLoading = false
    }

    function sendEmailVerify() {
        errorMessage = ""
        isLoading = true
        sendEmailVerification(auth.currentUser)
            .then(() => {
                goto("/verify")
            })
            .catch((error) => {
                errorMessage = error.code
            })
        isLoading = false
    }
</script>


<section class="flex flex-col bg-blue-200 p-10">
    <h1 class="flex justify-center text-xl font-bold mb-2">Sign Up</h1>
    <div class="flex flex-row items-center">
        {#if isLoading}
            <LoadingIndicator/>
        {/if}
        <ErrorMessage errorMessage={errorMessage}/>
    </div>
    <div class="flex flex-col gap-2">
        <input placeholder="email" bind:value={email}>
        <input placeholder="password" type="password" bind:value={password}>
        <input placeholder="repeat password" type="password" bind:value={repeatPassword}>
    </div>
    <div class="flex justify-center">
        <button class="mt-2 border-black border-2" on:click={signUp}>Submit</button>
    </div>

    <div class="flex justify-center">
        <p class="mr-2"> Do you haven't account?</p> <a class="text-red-600 font-bold" href={Routes.LOGIN}>Go to Login</a>
    </div>
</section>