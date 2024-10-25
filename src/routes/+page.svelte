<script lang="ts">
    import { onMount } from "svelte";

    let table: number[][] = [];

    let currentPlayer = 'circle';

    const resetTable = (size: number = 3) => {
        table = [];

        for (let rIndex = 0; rIndex < size; rIndex++) {
            let row = [];
            for (let cIndex = 0; cIndex < size; cIndex++) {
                row.push(0);
            }
            table.push(row);
        }

        // currentPlayer = 'circle'
    };

    onMount(() => {
        resetTable();
    });

    const switchPlayer = async () => {

        
        if(checkWin()){
            // Let time for action to render before alert
            await new Promise<void>((resolve, reject) => setTimeout(() => {
                resolve();
            }, 10));
            alert(`Player ${checkWin()} has won!`);
        };

        currentPlayer === 'circle' ? currentPlayer = 'cross' : currentPlayer = 'circle';
    }

    const checkWin = () => {
        // if fixedrow, any col === 3 || -3
        // if anyrow, fixedCol === 3 || -3
        // if 00 11 22 === 3 || -3
        // if 02 11 20 === 3 || -3
        const matrix: number[][] = table;
    
        // Calculate sum of rows
        const colSums = matrix.map(col => col.reduce((sum, current) => sum + current, 0));

        // Calculate sum of columns
        const rowSums = matrix[0].map((_row, rowIndex) => matrix.reduce((sum, current) => sum + current[rowIndex], 0));

        // Calculate sum of diagonals
        const diagonal1Sum = matrix.reduce((sum, current, index) => sum + current[index], 0);
        const diagonal2Sum = matrix.reduce((sum, current, index) => sum + current[matrix.length - index - 1], 0);

        console.log("Column sums:", rowSums)
        console.log("Row sums:", colSums)
        console.log("Diagonal 1 sum:", diagonal1Sum)
        console.log("Diagonal 2 sum:", diagonal2Sum)

        if(colSums.includes(3) || rowSums.includes(3) || diagonal1Sum === 3 || diagonal2Sum === 3) {
            return 'circle';
        } else if(colSums.includes(-3) || rowSums.includes(-3) || diagonal1Sum === -3 || diagonal2Sum === -3) {
            return 'cross'; 
        }
        else {
            return false;
        }
    }

    const onClickCell = (rowIndex: number, colIndex: number) => {
        table[rowIndex][colIndex] = currentPlayer === 'circle' ?  1 : -1;
        switchPlayer();
    }
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
                            <button class="btn" on:click={() => onClickCell(rIndex, cIndex)} disabled={cell !== 0}>{`[${rIndex},${cIndex}]: ${cell}`}</button>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
      </div>
    <div>
        Current Playing: {currentPlayer}
    </div>
</div>

