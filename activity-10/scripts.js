// Activity 10: Tic-Tac-Toe with localStorage
// This file demonstrates localStorage, game state management, and data persistence

console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");

// Part A: localStorage Demonstrations
console.log("\n=== LOCALSTORAGE DEMONSTRATIONS ===");

// Check localStorage support
function checkLocalStorageSupport() {
    try {
        const test = "localStorage-test";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        console.log("\u2713 localStorage is supported and available");
        return true;
    } catch (error) {
        console.error("\u2717 localStorage is not available:", error);
        return false;
    }
}

const isLocalStorageSupported = checkLocalStorageSupport();

// Part B: Game State Management
console.log("\n=== GAME STATE MANAGEMENT ===");

const STORAGE_KEYS = {
    GAME_STATE: "tictactoe-game-state",
    STATISTICS: "tictactoe-statistics",
};

let gameState = {
    board: Array(9).fill(""),
    currentPlayer: "X",
    gameOver: false,
    winner: null,
    history: [],
};

let statistics = {
    totalGames: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
};

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

console.log("Winning combinations:", WINNING_COMBINATIONS);

// Initialize new game
function initializeGame() {
    console.log("Initializing new game");

    gameState = {
        board: Array(9).fill(""),
        currentPlayer: "X",
        gameOver: false,
        winner: null,
        history: gameState.history || [],
    };

    updateBoard();
    updateStatus();
    saveGameState();

    console.log("New game initialized:", gameState);
}

// Make a move
function makeMove(index) {
    console.log(`Attempting move at index ${index} by player ${gameState.currentPlayer}`);

    if (!gameState.gameOver && gameState.board[index] === "") {
        gameState.board[index] = gameState.currentPlayer;
        const result = evaluateBoard();

        if (result) {
            gameState.gameOver = true;
            gameState.winner = result;
            handleGameEnd(result);

            console.log(`Game over! Result: ${result}`);
        } else {
            togglePlayer();
            console.log(`Switched to player ${gameState.currentPlayer}`);
        }

        saveGameState();
        updateBoard();
        updateStatus();
    } else {
        console.log("Invalid move - cell already taken or game over");
    }
}

// Evaluate the board for winner or draw
function evaluateBoard() {
    for (let [a, b, c] of WINNING_COMBINATIONS) {
        if (
            gameState.board[a] &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]
        ) {
            return gameState.board[a]; // "X" or "O"
        }
    }

    if (gameState.board.every(c => c !== "")) {
        return "Draw";
    }

    return null;
}

// Switch player
function togglePlayer() {
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
}

// Handle game end
function handleGameEnd(result) {
    console.log("Handling game end, result:", result);

    statistics.totalGames++;
    if (result === "X") statistics.xWins++;
    else if (result === "O") statistics.oWins++;
    else statistics.draws++;

    gameState.history.push({
        winner: result,
        board: [...gameState.board],
        date: new Date().toLocaleString(),
    });

    saveStatistics();
    updateStatisticsDisplay();
}

// Part C: localStorage Integration
console.log("\n=== LOCALSTORAGE INTEGRATION ===");

function saveGameState() {
    if (!isLocalStorageSupported) return;
    try {
        localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
        console.log("Game state saved to localStorage");
    } catch (error) {
        console.error("Failed to save game state:", error);
    }
}

function loadGameState() {
    if (!isLocalStorageSupported) return false;
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
        if (saved) {
            gameState = JSON.parse(saved);
            console.log("Game state loaded from localStorage:", gameState);
            return true;
        }
    } catch (error) {
        console.error("Failed to load game state:", error);
    }
    return false;
}

function saveStatistics() {
    if (!isLocalStorageSupported) return;
    try {
        localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
        console.log("Statistics saved to localStorage");
    } catch (error) {
        console.error("Failed to save statistics:", error);
    }
}

function loadStatistics() {
    if (!isLocalStorageSupported) return;
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.STATISTICS);
        if (saved) {
            statistics = JSON.parse(saved);
            console.log("Statistics loaded from localStorage:", statistics);
        }
    } catch (error) {
        console.error("Failed to load statistics:", error);
    }
}

function resetStatistics() {
    if (confirm("Are you sure you want to reset all statistics?")) {
        console.log("Resetting statistics");
        statistics = { totalGames: 0, xWins: 0, oWins: 0, draws: 0 };
        gameState.history = [];
        saveStatistics();
        updateStatisticsDisplay();
    }
}

// Part D: UI Update Functions
function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        const value = gameState.board[index];
        cell.textContent = value;

        cell.classList.remove("taken", "x", "o", "winning");
        if (value) {
            cell.classList.add("taken", value.toLowerCase());
        }
    });
    console.log("Board display updated");
}

function updateStatus() {
    const statusElement = document.getElementById("statusMessage");
    statusElement.classList.remove("winner", "draw");

    if (gameState.gameOver) {
        if (gameState.winner === "Draw") {
            statusElement.textContent = "It's a draw! \uD83E\uDD1D";
            statusElement.classList.add("draw");
        } else {
            statusElement.textContent = `Player ${gameState.winner} wins! \uD83C\uDFC6`;
            statusElement.classList.add("winner");
        }
    } else {
        statusElement.textContent = `Player ${gameState.currentPlayer}'s turn`;
    }

    console.log("Status display updated");
}

function updateStatisticsDisplay() {
    document.getElementById("totalGames").textContent = statistics.totalGames;
    document.getElementById("xWins").textContent = statistics.xWins;
    document.getElementById("oWins").textContent = statistics.oWins;
    document.getElementById("draws").textContent = statistics.draws;
    console.log("Statistics display updated");
}

// Event handlers
function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;
    const index = parseInt(cell.getAttribute("data-index"));
    makeMove(index);
}

function handleNewGame() {
    console.log("New game button clicked");
    initializeGame();
}

function handleResetStats() {
    console.log("Reset statistics button clicked");
    resetStatistics();
}

// Initialize application
function initializeApp() {
    console.log("Initializing Tic-Tac-Toe application...");

    loadStatistics();
    const hasGameState = loadGameState();

    if (!hasGameState) {
        console.log("No saved game found, starting new game");
        initializeGame();
    } else {
        console.log("Loaded saved game from localStorage");
        updateBoard();
        updateStatus();
    }

    updateStatisticsDisplay();

    document.getElementById("gameBoard").addEventListener("click", handleCellClick);
    document.getElementById("newGameBtn").addEventListener("click", handleNewGame);
    document.getElementById("resetStatsBtn").addEventListener("click", handleResetStats);

    console.log("Tic-Tac-Toe application initialized successfully!");
}

// Start the application
if (isLocalStorageSupported) {
    initializeApp();
} else {
    alert("localStorage is not supported in your browser. The game will work but data will not persist.");
    initializeApp();
}

// Display demo content
document.getElementById("output").innerHTML = `
  <h3>Tic-Tac-Toe Features</h3>
  <p>&#9989; localStorage integration for game state persistence</p>
  <p>&#9989; Save and load game automatically</p>
  <p>&#9989; Track game statistics (wins, losses, draws)</p>
  <p>&#9989; Winner detection for all combinations</p>
  <p>&#9989; JSON serialization and parsing</p>
  <p>Check the console for localStorage demonstrations!</p>
`;
