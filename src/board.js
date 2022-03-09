const { Cell, Counter } = require('../lib/utils.js');

class SudokuBoard {
    /**
     * Models a 9x9 sudoku board given an input string consisting of 81 numbers from 0-9 separated by commas
     * 
     * @param {string} boardString 
     */
    constructor(boardString) {
        this._boardString = boardString;
        this._solvedBoardString = null;
        this._board = this.populateBoard();
    }

    get boardString() {
        return this._boardString;
    }

    get solvedBoardString() {
        return this._solvedBoardString;
    }

    /**
     * Method for building internal represention of sudoku board by creating appropriate 
     * cells for each index in the 2-D array representing the board
     * 
     * @returns {object} board 2-D array consisting of cell objects
     */
    populateBoard() {
        const boardList = SudokuBoard.getBoardList(this._boardString);
        const board = SudokuBoard.buildBoard(boardList.length);
        let row = -1;
        for (let j = 0; j < boardList.length; j++) {
            if ((j % 9) === 0) {
                row += 1;
            }     
            const col = j % 9;
            const domain = new Set();
            if (Number(boardList[j]) === 0) {
                for (let i = 1; i < 10; i++) {
                    domain.add(i);
                } 
            } 
            board[row][col] = new Cell(Number(boardList[j]), domain);
       }
       return board;
    }

    /**
     * 
     * @returns {object} JSON object representing the solver result
     */
     solveBoard() {
        let startRow, startCol;
        [startRow, startCol] = this.getFirstEmptyCell();
        const numBacktracks = new Counter();
        const hasSolution = this.btSolver(startRow, startCol, numBacktracks);
        if (hasSolution) {
            this._solvedBoardString = this.getBoardString();
        }
        return {
            'hasSolution': hasSolution,
            'solvedBoard': this._solvedBoardString,
            'numBacktracks': numBacktracks.count
        }
    }

    /**
     * Recursive implementation of a backtracking sudoku solver that tries all valid values for a 
     * cell based on its domain and board constraints.
     * 
     * @param {number} row row index of current cell 
     * @param {number} col col index of current cell
     * @param {object} numBacktracks Counter to keep track of number of backtracks 
     * @returns {boolean} true if board is solvable and solved board is found, false otherwise
     */
    btSolver(row, col, numBacktracks) {
        if (row === null && col === null) {
            return true;
        }
        let nextRow, nextCol;
        [nextRow, nextCol] = this.getNextEmptyCell(row, col);       
        for (const value of this._board[row][col].domain) {
            if (this.isValid(value, row, col)) {
                this._board[row][col].val = value;
                if (this.btSolver(nextRow, nextCol, numBacktracks)) {
                    return true;
                }
            }        
        }
        this._board[row][col].val = 0;
        numBacktracks.incrementCounter();
        return false;
    }

    /**
     * Gets row and column indices of the next empty cell in the board
     * 
     * @param {number} row row index of current cell
     * @param {number} col col index of current cell
     * @returns {object} [row, col] array representing the indices of the next empty cell. [null, null] returned
     * if all cells have been filled
     */
    getNextEmptyCell(row, col) {
        for (let j = col + 1; j < this._board[0].length; j++) {
            const cell = this._board[row][j];
            if (cell.val === 0) {
                return [row, j];
            }
        }
        for (let i = row + 1; i < this._board.length; i++) {
            for (let j = 0; j < this._board[0].length; j++) {
                const cell = this._board[i][j];
                if (cell.val === 0) {
                    return [i, j];
                }
            }
        }
        return [null, null];
    }

    /**
     * Gets row and column indices of the first empty cell in the sudoku board
     * 
     * @returns {object} [row, col] array representing the indices of the next empty cell. [null, null] returned
     */
    getFirstEmptyCell() {
        for (let row = 0; row < this._board.length; row++) {
            for (let col = 0; col < this._board[0].length; col++) {
                const cell = this._board[row][col];
                if (cell.val === 0) {
                    return [row, col];
                }
            }
        }
        return [null, null];
    }

    /**
     * Method which checks whether value under consideration for current cell is valid
     * 
     * @param {number} value current cell value being considered
     * @param {number} row row index of current cell
     * @param {number} col column index of current cell
     * @returns {boolean} true if current cell value is valid, false otherwise
     */
    isValid(value, row, col) {
        return this.validRow(value, row, col) && this.validColumn(value, row, col) && this.validSubgrid(value, row, col);
    }

    /**
     * Helper method which checks whether value under consideration for current cell satisfies row constraints
     * 
     * @param {number} value current cell value being considered
     * @param {number} row row index of current cell
     * @param {number} col column index of current cell
     * @returns {boolean} true if current cell value satisfies row constraints, false otherwise
     */
    validRow(value, row, col) {
        let rowVals = new Set();
        for (let j = 0; j < this._board[0].length; j++) {
            const cellVal = this._board[row][j].val;
            if (!(this.validHelper(j, col, row, row, cellVal, rowVals))){    
                return false;
            }; 
        }
        return !rowVals.has(value);
    }

    /**
     * Helper method which checks whether value under consideration for current cell satisfies column constraints
     * 
     * @param {number} value current cell value being considered
     * @param {number} row row index of current cell
     * @param {number} col column index of current cell
     * @returns {boolean} true if current cell value satisfies column constraints, false otherwise
     */
    validColumn(value, row, col) {
        const colVals = new Set();
        for (let i = 0; i < this._board.length; i++) {
            const cellVal = this._board[i][col].val;
            if (!(this.validHelper(i, row, col, col, cellVal, colVals))) {
                return false;
            };
        }
        return !colVals.has(value);
    }

    /**
     * Helper method which checks whether value under consideration for current cell satisfies subgrid constraints
     * 
     * @param {number} value current cell value being considered
     * @param {number} row row index of current cell
     * @param {number} col column index of current cell
     * @returns {boolean} true if current cell value satisfies subgrid constraints, false otherwise
     */
    validSubgrid(value, row, col) {
        const subgridVals = new Set();
        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        let endRow = startRow + 2;
        let endCol = startCol + 2;
        while (startRow < endRow && startCol < endCol) {
            for (let i = startRow; i < endRow; i++) {
                const cellVal = this._board[i][startCol].val;
                if (!this.validHelper(i, row, startCol, col, cellVal, subgridVals)) {
                    return false;
                }
            }          
            for (let j = startCol; j < endCol; j++) {
                const cellVal = this._board[endRow][j].val;
                if (!this.validHelper(endRow, row, j, col, cellVal, subgridVals)) {
                    return false;
                }
            }
            for (let i = endRow; i > startRow; i--) {
                const cellVal = this._board[i][endCol].val;
                if (!this.validHelper(i, row, endCol, col, cellVal, subgridVals)) {
                    return false;
                }
            }
            for (let j = endCol; j > startCol; j--) {
                const cellVal = this._board[startRow][j].val;
                if (!this.validHelper(startRow, row, j, col, cellVal, subgridVals)) {
                    return false;
                }
            }
            startRow += 1;
            startCol += 1;
            endRow -= 1;
            endCol -= 1;
        }
        const cellVal = this._board[startRow][startCol].val
        if (!this.validHelper(startRow, row, startCol, col, cellVal, subgridVals)) {
            return false;
        };
        return !subgridVals.has(value);
    }

    /**
     * Helper method which is used in validRows, validColumns and validSubGrid
     * to determine whether sudoku constraints are satisfied. vals is a set which
     * is used to keep track of cell values in a row, column or subgrid and if the 
     * cell value is equal to any value stored in the set, then the method returns 
     * false, otherwise the number is added to the set
     * 
     * @param {number} idx1 
     * @param {number} idx2 
     * @param {number} idx3 
     * @param {number} idx4 
     * @param {number} cellVal 
     * @param {object} vals 
     * @returns {boolean}
     */
    validHelper(idx1, idx2, idx3, idx4, cellVal, vals) {
        if ((idx1 !== idx2 || idx3 !== idx4) && cellVal !== 0) {
            if (vals.has(cellVal)) {
                return false;
            } 
            vals.add(cellVal);      
        }
        return true;
    }

    /**
     * Helper method for converting input board string into an array of numbers
     * 
     * @param {string} boardString input string representing the sudoku board
     * @returns {object}
     */
     static getBoardList(boardString) {
        return boardString.split(', ');
    }

    /**
     * Helper method for initializing a 9x9 sudoku board
     * 
     * @param {number} boardListLength length of the boardList
     * @returns {object} 2-D array initialized to 0 representing 9x9 sudoku board
     */
    static buildBoard(boardListLength) {
        if (Math.sqrt(boardListLength) !== 9) {
            throw new Error('9x9 board not provided')
        }
        const board = [];
        for (let i = 0; i < 9; i++) {
            const row = []
            for (let j = 0; j < 9; j++) {
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }

    /**
     * Helper method for generating the string representing the current board state
     * 
     * @returns {string} string representing current board values
     */
    getBoardString() {
            const currentBoardState = this._board;
            const boardArray = []
            for (const row of currentBoardState) {
                for (const cell of row) {
                    boardArray.push(cell.val);
                }
            }
            return boardArray.join(', ');
        }

    /**
     * Helper method for displaying the internal board state in the form of an 2-D array
     * 
     */
    displayBoard() {
        const boardString = [];
        for (const row of this._board) {
            for (const cell of row) {
                boardString.push(String(cell.val) + ' ');
            }
            boardString.push('\n');
        }
        console.log(boardString.join(''));
    }
}

module.exports = SudokuBoard;