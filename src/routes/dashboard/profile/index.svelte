<script lang="ts">
    import { getAuth, updatePassword, updateEmail, deleteUser} from "firebase/auth"
    import ErrorMessage from "../../../lib/components/ErrorMessage.svelte";
    import LoadingIndicator from "../../../lib/components/LoadingIndicator.svelte";
    import {goto} from "$app/navigation"
    import {Routes} from "../../routes";

    let newPassword: string = "",
        repeatPassword: string = "",
        errorMessage: string = "",
        passwordUpdated: boolean = false,
        emailUpdated: boolean = false,
        isLoading: boolean = false,
        newEmail: string = "",
        context: string = "",
        username: string = ""

    const auth = getAuth()
    const user = auth.currentUser
    $: console.log("user.email", user.email)


    function changePassword() {
        errorMessage = ""
        context = "updatePassword"
        if(newPassword.length < 6) {
            errorMessage = "New password must be at least 6 characters"
            return
        }
        if(newPassword !== repeatPassword) {
            errorMessage = "New password and repeat password aren't the same"
            return
        }
        isLoading = true
        updatePassword(user, newPassword)
            .then(() => {
                passwordUpdated = true
            })
            .catch((error) => {
                errorMessage = error.message
            })
        isLoading = false
    }

    function changeEmail() {
        errorMessage = ""
        context = "updateEmail"
        if(newEmail.includes("@") == false && newEmail.includes(".") == false) {
            errorMessage = "Incorrect Email"
            return
        }
        isLoading = true
        updateEmail(user, newEmail)
            .then(() => {
                emailUpdated = true
            })
            .catch((error) => {
                errorMessage = error.message
            })
        isLoading = false
    }

    function deleteAccount() {
        errorMessage = ""
        context = "deleteAccount"
        if(username !== user.email) {
            errorMessage = "your username is incorrect"
            return
        }
        isLoading = true
        deleteUser(user)
            .then(() => {
                console.log('Successfully deleted user');
             })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
        isLoading = false
        goto(Routes.LOGIN)
    }

</script>

<main class="bg-blue-200 h-screen w-screen">
    <section class="bg-blue-400 p-5">
            <div class="m-2">
                {#if context === "updatePassword" }
                    <div class="flex flex-row items-center">
                        {#if isLoading}
                            <LoadingIndicator/>
                        {/if}
                        <ErrorMessage errorMessage={errorMessage}/>
                    </div>
                {/if}
                <h1 class="font-bold text-xl">Change Password</h1>
                {#if passwordUpdated}
                    <h1 class="font-bold text-green-500">Password updated</h1>
                {/if}
            </div>
            <div class="m-2">
                <input placeholder="New Password" bind:value={newPassword}>
            </div>
            <div class="m-2">
                <input placeholder="Repeat Password" bind:value={repeatPassword}>
            </div>
            <button class="m-2 bg-red-500" on:click={changePassword}>Submit</button>
        </section>

    <section class="bg-blue-400 p-5 mt-2">
        <div class="m-2">
            {#if context === "updateEmail"}
                <div class="flex flex-row items-center">
                    {#if isLoading}
                        <LoadingIndicator/>
                    {/if}
                    <ErrorMessage errorMessage={errorMessage}/>
                </div>
            {/if}
            <h1 class="font-bold text-xl">Change Email</h1>
            {#if emailUpdated}
                <h1 class="font-bold text-green-500">email updated</h1>
            {/if}
        </div>
        <div class="m-2">
            <input placeholder="New email" bind:value={newEmail}>
        </div>
        <button class="m-2 bg-red-500" on:click={changeEmail}>Submit</button>
    </section>

    <section class="bg-blue-400 p-5 mt-2">
        <div class="m-2">
            {#if context === "deleteAccount"}
                <div class="flex flex-row items-center">
                    {#if isLoading}
                        <LoadingIndicator/>
                    {/if}
                    <ErrorMessage errorMessage={errorMessage}/>
                </div>
            {/if}
            <h1 class="font-bold text-xl">Delete Account</h1>
            <h1 class="text-lg">If you want delete account, enter your username ({user.email})/</h1>
            <input placeholder="enter username" bind:value={username}>
        </div>
        <button class="m-2 bg-red-500" on:click={deleteAccount}>Delete</button>
    </section>

</main>