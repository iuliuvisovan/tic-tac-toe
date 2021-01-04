export default {
  // ATTRIBUTES
  boardSize: 5,
  squares: [],
  symbols: {
    options: ['X', 'O'],
    turn_index: 0,
    change: function () {
      this.turn_index = this.turn_index === 0 ? 1 : 0;
    },
  },
  gameOver: false,
  draw: false,
  winning_sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  // FUNCTIONS
  init: function (container) {
    this.container_element = container;
  },

  makePlay: function (targetSquareIndex) {
    if (this.gameOver) return false;
    if (this.squares[targetSquareIndex] === '') {
      this.squares[targetSquareIndex] = this.symbols.options[this.symbols.turn_index];
      const currentSymbol = this.symbols.options[this.symbols.turn_index];
      const hasCurrentPlayerWon = this.isGameWonBy(currentSymbol);
      if (hasCurrentPlayerWon) {
        this.gameOver = true;
        this.winningSymbol = currentSymbol == 'X' ? 'black' : 'white';
      } else {
        this.symbols.change();
      }
      return true;
    } else {
      if (this.isBoardFull()) {
        this.draw = true;
      } else {
        return false;
      }
    }
  },

  isBoardFull() {
    return this.squares.every((x) => x !== '');
  },

  setBoardSize(value) {
    return (this.boardSize = value);
  },

  isColumnWonBy: function (symbol, columnIndex) {
    const columnValues = [...new Array(this.boardSize)].map((_, i) => this.squares[this.boardSize * i + columnIndex]);

    return columnValues.filter((x) => x == symbol).length == this.boardSize;
  },

  isRowWonBy: function (symbol, rowIndex) {
    const rowValues = this.squares.slice(rowIndex * this.boardSize, rowIndex * this.boardSize + this.boardSize);

    return rowValues.filter((x) => x === symbol).length == this.boardSize;
  },

  isDiagonalWonBy: function (symbol) {
    return (
      this.squares.filter((_, i) => i % (this.boardSize + 1) == 0).filter((x) => x == symbol).length == this.boardSize
    );
  },

  isGameWonBy: function (symbol) {
    const isAnyColumnWon = [...new Array(this.boardSize)].some((_, i) => this.isColumnWonBy(symbol, i));
    if (isAnyColumnWon) {
      return true;
    }

    const isAnyRowWon = [...new Array(this.boardSize)].some((_, i) => this.isRowWonBy(symbol, i));
    if (isAnyRowWon) {
      return true;
    }

    const isTheDiagonalWon = this.isDiagonalWonBy(symbol);
    if (isTheDiagonalWon) {
      return true;
    }

    return false;
  },

  startNewGame: function () {
    this.squares = [...Array(this.boardSize * this.boardSize)].fill('');
    this.gameOver = false;
    this.draw = false;
  },
};
