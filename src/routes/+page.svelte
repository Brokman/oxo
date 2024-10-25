<script lang="ts">
    import ConfettiExplosion from "$lib/components/ConfettiExplosion.svelte";
    import Circle from "$lib/icons/Circle.svelte";
    import Cross from "$lib/icons/Cross.svelte";
    import { onMount } from "svelte";

    let table: number[][] = [];

    let currentPlayer = "circle";

    const resetTable = (size: number = 3) => {
        table = [];

        for (let rIndex = 0; rIndex < size; rIndex++) {
            let row = [];
            for (let cIndex = 0; cIndex < size; cIndex++) {
                row.push(0);
            }
            table.push(row);
        }
        isBlocked = false;
        hasWinner = false;
        winner = "";
        // currentPlayer = 'circle'
    };

    onMount(() => {
        resetTable();
    });

    const checkGameStatus = () => {
        const matrix = table;
        const colSums = matrix.map((col) => col.reduce((sum, current) => sum + current, 0));
        const rowSums = matrix[0].map((_row, rowIndex) => matrix.reduce((sum, current) => sum + current[rowIndex], 0));
        const diagonal1Sum = matrix.reduce((sum, current, index) => sum + current[index], 0);
        const diagonal2Sum = matrix.reduce((sum, current, index) => sum + current[matrix.length - index - 1], 0);

        if (colSums.includes(3) || rowSums.includes(3) || diagonal1Sum === 3 || diagonal2Sum === 3) {
            hasWinner = true;
            winner = "circle";
            return "circle";
        } else if (colSums.includes(-3) || rowSums.includes(-3) || diagonal1Sum === -3 || diagonal2Sum === -3) {
            hasWinner = true;
            winner = "cross";
            return "cross";
        } else {
            let totals: number[] = [];
            matrix.map((row) => row.map((cell) => totals.push(cell)));
            if (totals.includes(0) === false) {
                isBlocked = true;
                draw();
            }
            return false;
        }
    };

    const switchPlayer = async () => {
        currentPlayer === "circle" ? (currentPlayer = "cross") : (currentPlayer = "circle");
    };

    const draw = async () => {
        // Let time for action to render before alert
        await new Promise<void>((resolve, reject) =>
            setTimeout(() => {
                resolve();
            }, 100),
        );
        alert(`Draw!`);
        resetTable();
    };

    const onClickCell = (rowIndex: number, colIndex: number) => {
        table[rowIndex][colIndex] = currentPlayer === "circle" ? 1 : -1;
        const result = checkGameStatus();
        if (result === false) {
            // Update the game state accordingly
            switchPlayer();
        }
    };

    let hasWinner = false;
    let winner = "";
    let isBlocked = false;
</script>

<div class="container p-2 flex flex-col items-center gap-10">
    <h1 class="text-base-content/90 text-4xl">Welcome to OxO</h1>
    <div class="w-fit mockup-window border border-base-300">
        <button class="btn absolute right-1 top-1" on:click={() => resetTable()}>Clear</button>
        <div class="flex justify-center px-4 py-16 border-t border-base-300">
            <div class="flex gap-2 px-4">
                {#each table as row, rIndex}
                    <div class="flex flex-col gap-2">
                        {#each row as cell, cIndex}
                            <button
                                class="btn text-center min-h-15 max-w-full max-h-full"
                                on:click={() => onClickCell(rIndex, cIndex)}
                                disabled={cell !== 0 || hasWinner}
                            >
                                {#if cell === 1}
                                    <Circle />
                                {:else if cell === -1}
                                    <Cross />
                                {:else}
                                    <div class="w-7 h-15"></div>
                                {/if}
                            </button>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center gap-2">
        {#if hasWinner}
            <h4 class="text-base-content/90 text-2xl">Winner:</h4>
            <div class="flex justify-center items-center gap-2 mt-2 capitalize">
                <img
                    src="src/lib/images/wired-outline-1780-medal-first-place-hover-pinch.gif"
                    alt="wining medal"
                    width="48"
                    height="48"
                />
                :
                {#if winner === "circle"}<Circle />{:else if winner === "cross"}<Cross />{/if}
                {winner}
            </div>
        {:else if isBlocked}
            <h4 class="text-base-content/90 text-2xl">Draw!</h4>
        {:else}
            <h4 class="text-base-content/90 text-2xl">Current Playing:</h4>
            <div class="flex justify-center items-center gap-2 mt-2 capitalize">
                {#if currentPlayer === "circle"}<Circle />{:else if currentPlayer === "cross"}<Cross />{/if}
                {currentPlayer}
            </div>
        {/if}
    </div>
</div>
<ConfettiExplosion />
