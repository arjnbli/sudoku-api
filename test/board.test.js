const SudokuBoard = require('../src/board.js');

test('test buildBoard constructor with valid input', () => {
    const boardString = '0, 2, 0, 0, 9, 0, 1, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 1, 9, 0, 4, 0, 0, 0, 0, 0, 0, 6, 0, 5, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 5, 4, 9, 0, 0, 3, 0, 0, 0, 0';
    const board = new SudokuBoard(boardString);
    expect(board.boardString).toEqual(boardString);
    expect(board.solvedBoardString).toEqual(null);
})

//test case for checking internal representation


test('test buildBoard constructor with invalid input', () => {
    expect(() => {
        const boardString2 = '0, 2, 0, 0, 9';
        new SudokuBoard(boardString2);
    }).toThrow('9x9 board not provided')
});