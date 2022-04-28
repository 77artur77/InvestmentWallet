<script lang="ts">
    export let errorMessage = '' // option: can be HTML.

    function buildErrorMessageStyle() {
        if (errorMessage.length > 0) {
            let text = ' text-sm text-red-600 font-semibold'
            let padding = ' py-2 px-3 '
            return text + padding
        } else {
            errorMessage = ''
        }
    }
</script>

{#if errorMessage.length > 0}
    <div class="flex flex-row">
        <img src="/src/assets/errorIcon.svg" alt="errorIcon">
        <p class={buildErrorMessageStyle()}>{@html errorMessage}</p>
    </div>
{/if}