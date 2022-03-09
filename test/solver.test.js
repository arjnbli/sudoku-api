const SudokuSolver = require('../src/solver.js');

test('test solver', () => {
    const boardString1 = '7, 8, 0, 4, 0, 0, 1, 2, 0, 6, 0, 0, 0, 7, 5, 0, 0, 9, 0, 0, 0, 6, 0, 1, 0, 7, 8, 0, 0, 7, 0, 4, 0, 2, 6, 0, 0, 0, 1, 0, 5, 0, 9, 3, 0, 9, 0, 4, 0, 6, 0, 0, 0, 5, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7';
    const boardString1Solved = '7, 8, 5, 4, 3, 9, 1, 2, 6, 6, 1, 2, 8, 7, 5, 3, 4, 9, 4, 9, 3, 6, 2, 1, 5, 7, 8, 8, 5, 7, 9, 4, 3, 2, 6, 1, 2, 6, 1, 7, 5, 8, 9, 3, 4, 9, 3, 4, 1, 6, 2, 7, 8, 5, 5, 7, 8, 3, 9, 4, 6, 1, 2, 1, 2, 6, 5, 8, 7, 4, 9, 3, 3, 4, 9, 2, 1, 6, 8, 5, 7';
    const solver1 = new SudokuSolver(boardString1);
    const solverOutput1 = solver1.solve();
    expect(solverOutput1.solvedBoard).toEqual(boardString1Solved);
    expect(solver1.sudokuBoard.getBoardString()).toEqual(boardString1Solved);
    expect(solverOutput1.hasSolution).toEqual(true);

    const boardString2 = '0, 0, 0, 0, 3, 0, 0, 0, 9, 0, 4, 0, 5, 0, 0, 0, 7, 8, 2, 9, 0, 0, 0, 1, 0, 5, 0, 0, 7, 8, 0, 0, 3, 0, 0, 6, 0, 3, 0, 0, 6, 0, 0, 8, 0, 6, 0, 0, 8, 0, 0, 9, 3, 0, 0, 6, 0, 9, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 5, 0, 6, 0, 8, 0, 0, 0, 7, 0, 0, 0, 0';
    const boardString2Solved = '1, 8, 5, 7, 3, 6, 2, 4, 9, 3, 4, 6, 5, 2, 9, 1, 7, 8, 2, 9, 7, 4, 8, 1, 6, 5, 3, 5, 7, 8, 2, 9, 3, 4, 1, 6, 9, 3, 2, 1, 6, 4, 7, 8, 5, 6, 1, 4, 8, 5, 7, 9, 3, 2, 4, 6, 3, 9, 1, 8, 5, 2, 7, 7, 2, 9, 3, 4, 5, 8, 6, 1, 8, 5, 1, 6, 7, 2, 3, 9, 4';
    const solver2 = new SudokuSolver(boardString2);
    const solverOutput2 = solver2.solve();
    expect(solverOutput2.solvedBoard).toEqual(boardString2Solved);
    expect(solver2.sudokuBoard.getBoardString()).toEqual(boardString2Solved);
    expect(solverOutput2.hasSolution).toEqual(true);

    const boardString3 = '1, 0, 0, 3, 3, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 7, 8, 2, 9, 0, 0, 0, 1, 0, 5, 0, 0, 7, 8, 0, 0, 3, 0, 0, 6, 0, 3, 0, 0, 6, 0, 0, 8, 0, 6, 0, 0, 8, 0, 0, 9, 3, 0, 0, 6, 0, 9, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 5, 0, 6, 0, 8, 0, 0, 0, 7, 0, 0, 0, 0';
    const boardString3Solved = null;
    const solver3 = new SudokuSolver(boardString3);
    const solverOutput3 = solver3.solve();
    expect(solverOutput3.solvedBoard).toEqual(boardString3Solved);
    expect(solver3.sudokuBoard.getBoardString()).toEqual(boardString3);
    expect(solverOutput3.hasSolution).toEqual(false);

    const boardString4 = '5, 3, 8, 9, 1, 7, 6, 4, 2, 2, 7, 9, 6, 4, 8, 5, 1, 3, 6, 1, 4, 3, 5, 2, 7, 9, 8, 9, 8, 7, 1, 2, 3, 4, 6, 5, 1, 2, 5, 4, 8, 6, 3, 7, 9, 4, 6, 3, 7, 9, 5, 8, 2, 1, 8, 9, 6, 2, 3, 4, 1, 5, 7, 3, 4, 1, 5, 7, 9, 2, 8, 6, 7, 5, 2, 8, 6, 1, 9, 3, 4';
    const boardString4Solved = '5, 3, 8, 9, 1, 7, 6, 4, 2, 2, 7, 9, 6, 4, 8, 5, 1, 3, 6, 1, 4, 3, 5, 2, 7, 9, 8, 9, 8, 7, 1, 2, 3, 4, 6, 5, 1, 2, 5, 4, 8, 6, 3, 7, 9, 4, 6, 3, 7, 9, 5, 8, 2, 1, 8, 9, 6, 2, 3, 4, 1, 5, 7, 3, 4, 1, 5, 7, 9, 2, 8, 6, 7, 5, 2, 8, 6, 1, 9, 3, 4';
    const solver4 = new SudokuSolver(boardString4Solved);
    const solverOutput4 = solver4.solve();
    expect(solverOutput4.solvedBoard).toEqual(boardString4Solved);
    expect(solver4.sudokuBoard.getBoardString()).toEqual(boardString4Solved);
    expect(solverOutput4.hasSolution).toEqual(true);
})