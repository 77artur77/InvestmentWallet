<script lang="ts">
    import {goto} from "$app/navigation"
    import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
    import {Routes} from "../../../routes/routes.ts";
    import ErrorMessage from "../ErrorMessage.svelte";
    import LoadingIndicator from "../LoadingIndicator.svelte";

    let email = ""
    let password = ""
    let errorMessage = ""
    let isLoading = false

    const auth = getAuth()

    function login() {
        errorMessage = ""
        if(email.length === 0 || password.length === 0) {
            errorMessage = "Enter email and password"
            return
        }
        // if(auth.currentUser.emailVerified === false ) {
        //     goto(Routes.VERIFY)
        // } else {
            isLoading = true
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    localStorage.setItem("uid", user.uid)
                    goto("/")
                })
                .catch((error) => {
                    if(error.code == "auth/invalid-email" || error.code == "auth/wrong-password") {
                        errorMessage = "Invalid email or password"
                        return
                    }
                    console.log("email valid???", auth.currentUser.emailVerified)
                    errorMessage = error.code
                })
            isLoading = false
        // }

    }
</script>


<section class="flex flex-col bg-blue-200 p-10">
    <h1 class="flex justify-center text-xl font-bold mb-2">Login</h1>
    <div class="flex flex-row items-center">
        {#if isLoading}
            <LoadingIndicator/>
        {/if}
        <ErrorMessage errorMessage={errorMessage}/>
    </div>
    <div class="flex flex-col gap-2">
        <input placeholder="email" bind:value={email}>
        <input placeholder="password" bind:value={password}>
    </div>
    <div class="flex justify-center">
        <button class="mt-2 border-black border-2" on:click={login}>Submit</button>
    </div>
    <div class="flex justify-center">
       <p class="mr-2"> Do you haven't account?</p> <a class="text-red-600 font-bold" href={Routes.SIGNUP} >Go to Sign up</a>
    </div>
    <div class="flex justify-center">
        <p class="mr-2"> Forgot password?</p> <a class="text-red-600 font-bold" href={Routes.FORGOT_PASSWORD} >Go to Forgot password</a>
    </div>
</section>