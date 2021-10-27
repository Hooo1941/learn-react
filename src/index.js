import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Winsquare(props) {
  return (
    <button className="winsquare" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i, win) {
    if (win === false)
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          key={i}
        />
      );
    else
      return (
        <Winsquare
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          key={i}
        />
      );
  }
  let board = [];
  for (var i = 0; i < 3; i++) {
    var squares = [];
    for (var j = i * 3; j < i * 3 + 3; j++) {
      var square = renderSquare(j, false);
      if (props.winner !== null)
        if (j === props.winner.a || j === props.winner.b || j === props.winner.c)
          square = renderSquare(j, true);
      squares.push(square);
    }
    board = board.concat(<div className="board-row"
      key={i}>{squares}</div>);
  }
  return (
    <div>
      {board}
    </div>);

}

function Game() {
  const [stepNumber, setStepNumber] = useState(0);
  const [desc, setDesc] = useState(false);
  const xIsNext = (stepNumber % 2) === 0;
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    pos: 0,
  }]);
  function handleClick(i) {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historySlice.concat([{
      squares: squares,
      pos: i
    }]));
    // setXIsNext(!xIsNext);
    setStepNumber(historySlice.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    // setXIsNext((step % 2) === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + ' pos: (' + (step.pos % 3 + 1) + ', ' + (Math.floor(step.pos / 3) + 1) + ')' :
      'Go to game start';
    if (stepNumber === move) return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}><b>{desc}</b></button>
      </li>
    );
    else
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
  });
  let status;
  if (winner) {
    status = 'Winner: ' + current.squares[winner.a];
  } else {
    if (stepNumber === 9) status = '平局';
    else status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{desc ? moves.reverse() : moves}</ol>
        <div><button onClick={() => setDesc(!desc)}>倒序</button></div>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { a, b, c };
    }
  }
  return null;
}
