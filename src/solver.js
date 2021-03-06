const SudokuBoard  = require("./board.js");
const { displayBoard } = require('../lib/utils.js')

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
    /**
     * Driver method for running the solver on an input board and displaying
     * the output on the server end
     * 
     * @returns {object} JSON representing output of the sudoku solver
     */
    solve() {
        console.log('--------------------------------------');
        console.log('\nComputed by solver\n')
        console.log('\nGiven Board: \n');
        displayBoard(this._sudokuBoard.boardString);
        console.log('\n');
        const solverOutput = this._sudokuBoard.solveBoard();
        console.log('Solved Board: \n')
        if (this._sudokuBoard.solvedBoardString) {
            displayBoard(this._sudokuBoard.solvedBoardString);
            console.log(`\nNumber of backtracks : ${solverOutput.numBacktracks}`);
        } else {
            console.log('No solution');
            console.log(`\nNumber of backtracks : ${solverOutput.numBacktracks}`);
        }
        console.log('--------------------------------------');
        return solverOutput
    }
}

module.exports = SudokuSolver;