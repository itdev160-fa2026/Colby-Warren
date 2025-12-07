// Activity 11: React Tic-Tac-Toe
// This React version demonstrates:
// - Component-based architecture (Square, Board, Game)
// - Props for passing data to child components
// - useState for state management
// - Event handling in React
// - Lifting state up to share between components
// - Immutability with array copying (.slice())
// - Rendering lists with .map()
// - Time travel feature using game history
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        const winner = calculateWinner(squares);
        if (squares[i] || winner) return;

        const updated = squares.slice();
        updated[i] = xIsNext ? "X" : "O";
        onPlay(updated);
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>

            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>

            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

function Game() {
    // --- MAIN BOARD STATE ---
    const [history, setHistory] = React.useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = React.useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    // --- STATUS MESSAGE UPDATE ---
    function updateStatusText(text) {
        document.getElementById("statusMessage").textContent = text;
    }

    // --- UPDATE STATS PANEL ---
    function updateStatsPanel() {
        document.getElementById("xWins").textContent = localStorage.getItem("xWins") || 0;
        document.getElementById("oWins").textContent = localStorage.getItem("oWins") || 0;
        document.getElementById("draws").textContent = localStorage.getItem("draws") || 0;
        document.getElementById("totalGames").textContent = localStorage.getItem("totalGames") || 0;
    }

    // --- RECORD RESULT ---
    function recordResult(winner) {
        let total = Number(localStorage.getItem("totalGames") || 0) + 1;
        localStorage.setItem("totalGames", total);

        if (winner === "X") {
            localStorage.setItem("xWins", Number(localStorage.getItem("xWins") || 0) + 1);
        } else if (winner === "O") {
            localStorage.setItem("oWins", Number(localStorage.getItem("oWins") || 0) + 1);
        } else {
            localStorage.setItem("draws", Number(localStorage.getItem("draws") || 0) + 1);
        }

        updateStatsPanel();
    }

    // --- HANDLE PLAY WITH MOVE HISTORY ---
    function handlePlay(nextSquares) {
        const winner = calculateWinner(nextSquares);

        const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);

        if (winner) {
            updateStatusText("Winner: " + winner);
            recordResult(winner);
        } else if (!nextSquares.includes(null)) {
            updateStatusText("Draw!");
            recordResult(null);
        } else {
            updateStatusText("Player " + (xIsNext ? "O's" : "X's") + " turn");
        }
    }

    // --- TIME TRAVEL ---
    function jumpTo(move) {
        setCurrentMove(move);
        updateStatusText("Player " + (move % 2 === 0 ? "X" : "O") + "'s turn");
    }

    // --- NEW GAME ---
    function newGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        updateStatusText("Player X's turn");
    }

    // --- RESET STATS ---
    function resetStats() {
        localStorage.setItem("xWins", 0);
        localStorage.setItem("oWins", 0);
        localStorage.setItem("draws", 0);
        localStorage.setItem("totalGames", 0);
        updateStatsPanel();
    }

    // --- CONNECT BUTTONS ONCE ---
    React.useEffect(() => {
        document.getElementById("newGameBtn").onclick = newGame;
        document.getElementById("resetStatsBtn").onclick = resetStats;
        updateStatsPanel();
    }, []);

    // --- MOVE HISTORY LIST ---
    const moves = history.map((squares, move) => {
        return (
            <li key={move}>
                <button className="move-btn" onClick={() => jumpTo(move)}>
                    {move === 0 ? "Go to game start" : "Go to move #" + move}
                </button>
            </li>
        );
    });

    return (
        <div>
            <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
            />

            <h3 style={{ textAlign: "center", marginTop: "20px" }}>Move History</h3>
            <ol className="moves-list">{moves}</ol>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Game />);
