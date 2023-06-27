// import special function useState; allows for
// memorization of user clicks
import { useState } from "react";

// initialize function Square()
function Square({ value, onSquareClick }) {
  // calls onSquareClick when square is clicked
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );

  // value stores the value null, setValue is a
  // function used to change the value
  //const [value, setValue] = useState(null);

  //function handleClick() {
  // prints clicked! on console when user
  // clicks a square
  //console.log('clicked!');

  // sets square to X when clicked
  //setValue('X');
  //}

  //return (
  //<button
  //className="square"
  //onClick={handleClick}
  //>
  //{value}
  //</button>
  //);
}

// export function Board(), return JXS element
// button; className="board-row" denotes to CSS how
// to style the button
// Duplicate function Square() for each board row
function Board({ xIsNext, squares, onPlay }) {
  // updates the squares array holding board's state
  // creates copy of squares array with slice() Array method,
  // updates nextSquares array to add X to square i
  function handleClick(i) {
    // check if player has won, terminates if so
    // prevents changing X to O, & vice versa
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  // status displays the winner if the game is over,
  // or which player's turn if the game is ongoing
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // pass the value prop down to each instance of
  // Square
  return (
    <>
      <div className="status">{status}</div>
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

// top-level component to place history state containing
// the game history
export default function Game() {
  // history stores values, setHistory is used to change
  // these values
  // Array(9).fill(null) creates array of 9 elements,
  // each set to null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  // renders the currently selected move
  const currentSquares = history[currentMove];

  // updates Game's state to trigger a re-render
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // after a move, updates currentMove to point to latest history entry
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // transforms history of moves into React elements
  // that represent a button on the screen, & display
  // a list of buttons to jump to past moves
  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// takes array of 9 squares, checks for a winner,
// returns X, O, or null
function calculateWinner(squares) {
  // winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // parses each row for above combinations,
  // returns value in index 0 of lines, or null
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
