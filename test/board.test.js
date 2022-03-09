const SudokuBoard = require('../src/board.js');

test('test buildBoard constructor with valid input', () => {
    const boardString = '0, 2, 0, 0, 9, 0, 1, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 1, 9, 0, 4, 0, 0, 0, 0, 0, 0, 6, 0, 5, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 5, 4, 9, 0, 0, 3, 0, 0, 0, 0';
    const board = new SudokuBoard(boardString);
    expect(board.boardString).toEqual(boardString);
    expect(board.solvedBoardString).toEqual(null);
})

test('test buildBoard constructor with invalid input', () => {
    expect(() => {
        const boardString2 = '0, 2, 0, 0, 9';
        new SudokuBoard(boardString2);
    }).toThrow('9x9 board not provided')
});

test('test solver', () => {
    const boardString1 = '7, 8, 0, 4, 0, 0, 1, 2, 0, 6, 0, 0, 0, 7, 5, 0, 0, 9, 0, 0, 0, 6, 0, 1, 0, 7, 8, 0, 0, 7, 0, 4, 0, 2, 6, 0, 0, 0, 1, 0, 5, 0, 9, 3, 0, 9, 0, 4, 0, 6, 0, 0, 0, 5, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7';
    const boardString1Solved = '7, 8, 5, 4, 3, 9, 1, 2, 6, 6, 1, 2, 8, 7, 5, 3, 4, 9, 4, 9, 3, 6, 2, 1, 5, 7, 8, 8, 5, 7, 9, 4, 3, 2, 6, 1, 2, 6, 1, 7, 5, 8, 9, 3, 4, 9, 3, 4, 1, 6, 2, 7, 8, 5, 5, 7, 8, 3, 9, 4, 6, 1, 2, 1, 2, 6, 5, 8, 7, 4, 9, 3, 3, 4, 9, 2, 1, 6, 8, 5, 7';
    const board1 = new SudokuBoard(boardString1);
    const solverOutput1 = board1.solveBoard()
    expect(board1.solvedBoardString).toEqual(boardString1Solved);
    expect(solverOutput1.solvedBoard).toEqual(boardString1Solved);
    expect(solverOutput1.hasSolution).toEqual(true);

    const boardString2 = '0, 0, 0, 0, 3, 0, 0, 0, 9, 0, 4, 0, 5, 0, 0, 0, 7, 8, 2, 9, 0, 0, 0, 1, 0, 5, 0, 0, 7, 8, 0, 0, 3, 0, 0, 6, 0, 3, 0, 0, 6, 0, 0, 8, 0, 6, 0, 0, 8, 0, 0, 9, 3, 0, 0, 6, 0, 9, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 5, 0, 6, 0, 8, 0, 0, 0, 7, 0, 0, 0, 0';
    const boardString2Solved = '1, 8, 5, 7, 3, 6, 2, 4, 9, 3, 4, 6, 5, 2, 9, 1, 7, 8, 2, 9, 7, 4, 8, 1, 6, 5, 3, 5, 7, 8, 2, 9, 3, 4, 1, 6, 9, 3, 2, 1, 6, 4, 7, 8, 5, 6, 1, 4, 8, 5, 7, 9, 3, 2, 4, 6, 3, 9, 1, 8, 5, 2, 7, 7, 2, 9, 3, 4, 5, 8, 6, 1, 8, 5, 1, 6, 7, 2, 3, 9, 4';
    const board2 = new SudokuBoard(boardString2);
    const solverOutput2 = board2.solveBoard()
    expect(board2.solvedBoardString).toEqual(boardString2Solved);
    expect(solverOutput2.solvedBoard).toEqual(boardString2Solved);
    expect(solverOutput2.hasSolution).toEqual(true);

    const boardString3 = '5, 3, 8, 0, 1, 0, 0, 0, 0, 0, 7, 9, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 2, 3, 4, 0, 0, 0, 0, 5, 0, 8, 0, 0, 0, 9, 4, 6, 0, 0, 9, 0, 0, 0, 1, 0, 9, 0, 2, 3, 4, 1, 5, 0, 0, 4, 1, 5, 0, 0, 2, 0, 0, 0, 0, 0, 8, 6, 1, 0, 3, 0';
    const boardString3Solved =  '5, 3, 8, 9, 1, 7, 6, 4, 2, 2, 7, 9, 6, 4, 8, 5, 1, 3, 6, 1, 4, 3, 5, 2, 7, 9, 8, 9, 8, 7, 1, 2, 3, 4, 6, 5, 1, 2, 5, 4, 8, 6, 3, 7, 9, 4, 6, 3, 7, 9, 5, 8, 2, 1, 8, 9, 6, 2, 3, 4, 1, 5, 7, 3, 4, 1, 5, 7, 9, 2, 8, 6, 7, 5, 2, 8, 6, 1, 9, 3, 4';
    const board3 = new SudokuBoard(boardString3);
    const solverOutput3 = board3.solveBoard()
    expect(board3.solvedBoardString).toEqual(boardString3Solved);
    expect(solverOutput3.solvedBoard).toEqual(boardString3Solved);
    expect(solverOutput3.hasSolution).toEqual(true);

    const boardString4 = '5, 3, 8, 8, 1, 0, 0, 0, 0, 0, 7, 9, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 2, 3, 4, 0, 0, 0, 0, 5, 0, 8, 0, 0, 0, 9, 4, 6, 0, 0, 9, 0, 0, 0, 1, 0, 9, 0, 2, 3, 4, 1, 5, 0, 0, 4, 1, 5, 0, 0, 2, 0, 0, 0, 0, 0, 8, 6, 1, 0, 3, 0';
    const boardString4Solved = null;
    const board4 = new SudokuBoard(boardString4);
    const solverOutput4 = board4.solveBoard()
    expect(board4.solvedBoardString).toEqual(boardString4Solved);
    expect(solverOutput4.solvedBoard).toEqual(boardString4Solved);
    expect(solverOutput4.hasSolution).toEqual(false);

    const boardString5 = '1, 0, 0, 3, 3, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 7, 8, 2, 9, 0, 0, 0, 1, 0, 5, 0, 0, 7, 8, 0, 0, 3, 0, 0, 6, 0, 3, 0, 0, 6, 0, 0, 8, 0, 6, 0, 0, 8, 0, 0, 9, 3, 0, 0, 6, 0, 9, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 5, 0, 6, 0, 8, 0, 0, 0, 7, 0, 0, 0, 0';
    const boardString5Solved = null;
    const board5 = new SudokuBoard(boardString5);
    const solverOutput5 = board5.solveBoard()
    expect(board5.solvedBoardString).toEqual(boardString5Solved);
    expect(solverOutput5.solvedBoard).toEqual(boardString5Solved);
    expect(solverOutput5.hasSolution).toEqual(false);

    const boardString6 = '5, 3, 8, 9, 1, 7, 6, 4, 2, 2, 7, 9, 6, 4, 8, 5, 1, 3, 6, 1, 4, 3, 5, 2, 7, 9, 8, 9, 8, 7, 1, 2, 3, 4, 6, 5, 1, 2, 5, 4, 8, 6, 3, 7, 9, 4, 6, 3, 7, 9, 5, 8, 2, 1, 8, 9, 6, 2, 3, 4, 1, 5, 7, 3, 4, 1, 5, 7, 9, 2, 8, 6, 7, 5, 2, 8, 6, 1, 9, 3, 4';
    const boardString6Solved = '5, 3, 8, 9, 1, 7, 6, 4, 2, 2, 7, 9, 6, 4, 8, 5, 1, 3, 6, 1, 4, 3, 5, 2, 7, 9, 8, 9, 8, 7, 1, 2, 3, 4, 6, 5, 1, 2, 5, 4, 8, 6, 3, 7, 9, 4, 6, 3, 7, 9, 5, 8, 2, 1, 8, 9, 6, 2, 3, 4, 1, 5, 7, 3, 4, 1, 5, 7, 9, 2, 8, 6, 7, 5, 2, 8, 6, 1, 9, 3, 4';
    const board6 = new SudokuBoard(boardString6);
    const solverOutput6 = board6.solveBoard()
    expect(board6.solvedBoardString).toEqual(boardString6Solved);
    expect(solverOutput6.solvedBoard).toEqual(boardString6Solved);
    expect(solverOutput6.hasSolution).toEqual(true);

    const boardString7 = '0, 8, 5, 4, 3, 9, 1, 2, 6, 7, 1, 2, 8, 7, 5, 3, 4, 9, 4, 9, 3, 6, 2, 1, 5, 7, 8, 8, 5, 7, 9, 4, 3, 2, 6, 1, 2, 6, 1, 7, 5, 8, 9, 3, 4, 9, 3, 4, 1, 6, 2, 7, 8, 5, 5, 7, 8, 3, 9, 4, 6, 1, 2, 1, 2, 6, 5, 8, 7, 4, 9, 3, 3, 4, 9, 2, 1, 6, 8, 5, 7';
    const board7 = new SudokuBoard(boardString7);
    expect(board7.validColumn(7, 0, 0)).toEqual(false);
})