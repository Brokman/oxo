<script lang="ts">
    import { onMount } from "svelte";

    let table = [];

    const resetTable = (size: number = 3) => {
        table = [];

        for (let rIndex = 0; rIndex < size; rIndex++) {
            let row = [];
            for (let cIndex = 0; cIndex < size; cIndex++) {
                row.push(0);
            }
            table.push(row);
        }
    };

    onMount(() => {
        resetTable();
    });
</script>

<div class="container p-2 flex flex-col items-center">
    <h1>Welcome to OxO</h1>
    <div class="flex gap-2 p-4">
        {#each table as row}
            <div class="flex flex-col gap-2">
                {#each row as cell}
                    <button class="bg-sky-500 hover:bg-sky-700 ...">{cell}</button>
                {/each}
            </div>
        {/each}
    </div>
</div>

