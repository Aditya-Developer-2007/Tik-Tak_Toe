import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");
  const [isNameSet, setIsNameSet] = useState(false);
  const [winningSquares, setWinningSquares] = useState([]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    checkWinner(newBoard);
    setXIsNext(!xIsNext);
  };

  const checkWinner = (squares) => {
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
        setWinner(squares[a]);
        setWinningSquares([a, b, c]);
        return;
      }
    }

    if (!squares.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setWinningSquares([]);
  };

  if (!isNameSet) {
    return (
      <div className="game-container">
        <h2 className="title">🎯 Enter Player Names</h2>
        <input
          className="form-control mb-2"
          placeholder="Player 1 Name"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Player 2 Name"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => setIsNameSet(true)}
        >
          Start Game 🚀
        </button>
      </div>
    );
  }

  const renderSquare = (i) => (
    <div
      className={`cell ${winningSquares.includes(i) ? "winner-cell" : ""}`}
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </div>
  );

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe 🎮</h1>
      {!winner ? (
        <div className="status">
          {xIsNext ? `${playerX} (X)` : `${playerO} (O)`}'s Turn
        </div>
      ) : winner === "Draw" ? (
        <div className="status draw">🤝 It's a Draw!</div>
      ) : (
        <div className="status win">
          🎉 {winner === "X" ? playerX : playerO} Wins!
        </div>
      )}

      <div className="board">
        {board.map((_, i) => renderSquare(i))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        🔄 Restart Game
      </button>
    </div>
  );
}