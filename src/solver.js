const SudokuBoard  = require("./board.js");

class SudokuSolver {
    /**
     * Wrapper around Sudoku Board class
     * 
     * @param {*} boardString 
     */
    constructor(boardString) {
        this._sudokuBoard = new SudokuBoard(boardString);
    }

    get sudokuBoard() {
        return this._sudokuBoard;
    }

    solve() {
        console.log('Given Board: \n');
        this._sudokuBoard.displayBoard();
        const solverOutput = this._sudokuBoard.solveBoard();
        console.log('Solved Board: \n')
        this._sudokuBoard.displayBoard();
        return solverOutput
    }
}

module.exports = SudokuSolver;