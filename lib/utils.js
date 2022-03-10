class Cell {
    /**
     * Models a cell in a sudoku board with current value and a set of valid values
     * 
     * @param {number} val Current cell value. 0 for empty cell, 1-9 for a cell that is filled
     * @param {object} domain Set of values of a cell that are valid, empty set for a cell that is filled
     */
    constructor(val, domain) {
        this._val = val;
        this._domain = domain;
    }

    get val() {
        return this._val;
    }

    get domain() {
        return this._domain;
    }

    set val(newVal) {
        this._val = newVal;
    }

    set domain(newDomain) {
        this._domain = newDomain;
    }

}

class Counter {
    /**
     * Counter for keeping track of the number of backtracks. Initialized to 0 
     * @param {number} count 
     */

    constructor(count=0) {
        this._count = count;
    }

    get count() {
        return this._count;
    }
    /**
     * Increments the _count by 1
     */
    incrementCounter () {
        this._count += 1;
    }
}

/**
 * function for determining whether input string is in the valid format
 * 
 * @param {string} boardString 
 * @returns {boolean} true if input string is in the desired format, false otherwise
 */
const validateInput = (boardString) => {
    const validChars = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', ' ']);
    for (const char of boardString) {
        if (!validChars.has(char)) {
            console.log('invalid input')
            return false
        }
    }
    const boardList = boardString.split(', ');
    if (boardList.length != 81) {
        console.log('invalid input')
        return false
    }
    return true
};

/**
 * Function for printing the board in the form of a 2-D array from the 
 * board string
 * 
 * @param {*} boardString 
 */
const displayBoard = (boardString) => {
    const boardList = boardString.split(', ');
    const displayList = [];
    let count = 0;
    for (const char of boardList) {
        if (count > 0 && (count % 9 === 0)) {
            displayList.push('\n');
        }
        displayList.push(char + ' ');
        count += 1;
    }
    console.log(displayList.join(''));
}

module.exports.Cell = Cell;
module.exports.Counter = Counter; 
module.exports.validateInput = validateInput;
module.exports.displayBoard = displayBoard;