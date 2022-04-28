<script lang="ts">

    export let color = 'blue' // red, gray, blue
    $: updateColor(color)

    let currentColor = 'text-blue-600'

    function updateColor(color: string) {
        switch (color) {
            case "blue":
                currentColor = 'text-blue-600'
                break
            case "gray":
                currentColor = 'text-gray-600'
                break
            case "red":
                currentColor = 'text-red-600'
                break
        }
    }

</script>

<svg class={'motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 ' + currentColor } xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
            stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
<svg class={'hidden motion-reduce:inline -ml-1 mr-3 h-5 w-5 ' + currentColor } xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
            stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>