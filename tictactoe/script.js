document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes("");
    }

    function updateStatus() {
        const winner = checkWinner();
        const draw = checkDraw();

        if (winner) {
            status.textContent = `Player ${winner} wins!`;
            board.classList.add("disabled");
        } else if (draw) {
            status.textContent = "It's a draw!";
            board.classList.add("disabled");
        } else {
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function handleClick(index) {
        if (!gameBoard[index]) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();
        }
    }

    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => (cell.textContent = ""));
        status.textContent = `Player ${currentPlayer}'s turn`;
        board.classList.remove("disabled");
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!board.classList.contains("disabled")) {
                handleClick(index);
            }
        });
    });

    resetBtn.addEventListener("click", resetGame);

    resetGame();
});
