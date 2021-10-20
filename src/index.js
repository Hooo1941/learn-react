import React from 'react';
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

class Board extends React.Component {
  renderSquare(i, win) {
    if (win === false)
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    else
      return (
        <Winsquare
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
  }

  render() {
    let board = [];
    for (var i = 0; i < 3; i++) {
      var squares = [];
      for (var j = i * 3; j < i * 3 + 3; j++) {
        var square = this.renderSquare(j, false);
        if (this.props.winner !== null)
          if (j === this.props.winner.a || j === this.props.winner.b || j === this.props.winner.c)
            square = this.renderSquare(j, true);
        squares = squares.concat(square);
      }
      board = board.concat(<div className="board-row">{squares}</div>);
    }
    return (
      // t3
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        pos: 0,
      }],
      xIsNext: true,
      stepNumber: 0,
      desc: false, // t5
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        pos: i
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        // t1
        'Go to move #' + move + ' pos: (' + (step.pos % 3 + 1) + ', ' + (Math.floor(step.pos / 3) + 1) + ')' :
        'Go to game start';
      // t2
      if (this.state.stepNumber === move) return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
        </li>
      );
      else
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + current.squares[winner.a];
    } else {
      if (this.state.stepNumber === 9) status = '平局'; // t6
      else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.desc ? moves.reverse() : moves}</ol>
          <div><button onClick={() => this.setState({ desc: !this.state.desc })}>倒序</button></div>
        </div>
      </div>
    );
  }
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
