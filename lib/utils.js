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

    set count(count) {
        this._count = count;
    }
    /**
     * Increments the _count by 1
     */
    incrementCounter () {
        this._count += 1;
    }
}

module.exports.Cell = Cell;
module.exports.Counter = Counter; 