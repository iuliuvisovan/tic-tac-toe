export default {
  // ATTRIBUTES
  BOARD_SIZE: 5,
  squares: [...Array(5 * 5)],
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

  isColumnWonBy: function (symbol, columnIndex) {
    const columnValues = [...new Array(this.BOARD_SIZE)].map((_, i) => this.squares[this.BOARD_SIZE * i + columnIndex]);

    return columnValues.filter((x) => x == symbol).length == this.BOARD_SIZE;
  },

  isRowWonBy: function (symbol, rowIndex) {
    const rowValues = this.squares.slice(rowIndex * this.BOARD_SIZE, rowIndex * this.BOARD_SIZE + this.BOARD_SIZE);

    return rowValues.filter((x) => x === symbol).length == this.BOARD_SIZE;
  },

  isDiagonalWonBy: function (symbol) {
    return (
      this.squares.filter((_, i) => i % (this.BOARD_SIZE + 1) == 0).filter((x) => x == symbol).length == this.BOARD_SIZE
    );
  },

  isGameWonBy: function (symbol) {
    const isAnyColumnWon = [...new Array(this.BOARD_SIZE)].some((_, i) => this.isColumnWonBy(symbol, i));
    if (isAnyColumnWon) {
      return true;
    }

    const isAnyRowWon = [...new Array(this.BOARD_SIZE)].some((_, i) => this.isRowWonBy(symbol, i));
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
    this.squares.fill('');
    this.gameOver = false;
    this.draw = false;
  },
};
