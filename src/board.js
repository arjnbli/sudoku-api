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
     * Method for building internal representing of sudoku board be creating appropriate 
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
     * Helper method for converting input board string into an array of numbers
     * 
     * @param {string} boardString 
     * @returns {object}
     */
     static getBoardList(boardString) {
        return boardString.split(', ');
    }

    /**
     * Helper method for initializing a 9x9 sudoku board
     * 
     * @param {Number} boardListLength length of the boardList
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
}

module.exports = SudokuBoard;