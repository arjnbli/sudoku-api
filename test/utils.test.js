const { Cell, Counter, validateInput } = require('../lib/utils.js');

test('test cell class', () => {
    const cell = new Cell(4, new Set([1, 2, 3]));
    expect(cell.val).toBe(4);
    expect(cell.domain).toEqual(new Set([1, 2 ,3]));
    
    cell.val = 5;
    cell.domain = new Set([4,5,6,7]);
    expect(cell.val).toBe(5);
    expect(cell.domain).toEqual(new Set([4,5,6,7]));

})

test('test counter class', () => {
    const counter1 = new Counter();
    expect(counter1.count).toEqual(0);
    counter1.incrementCounter();
    expect(counter1.count).toEqual(1);

    const counter2 = new Counter(5);
    expect(counter2.count).toEqual(5);
    counter2.incrementCounter();
    expect(counter2.count).toEqual(6);
})

test('test validate input function 1', () => {
    const boardString1 = '7, 8, 0, 4, 0, 0, 1, 2, 0, 6, 0, 0, 0, 7, 5, 0, 0, 9, 0, 0, 0, 6, 0, 1, 0, 7, 8, 0, 0, 7, 0, 4, 0, 2, 6, 0, 0, 0, 1, 0, 5, 0, 9, 3, 0, 9, 0, 4, 0, 6, 0, 0, 0, 5, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7';
    expect(validateInput(boardString1)).toEqual(true);
})

test('test validate input function 2', () => {
    const boardString2 = '7, 8, 0, 4, a, $, 1, 2, 0, 6, 0, 0, 0, 7, 5, 0, 0, 9, 0, 0, 0, 6, 0, 1, 0, 7, 8, 0, 0, 7, 0, 4, 0, 2, 6, 0, 0, 0, 1, 0, 5, 0, 9, 3, 0, 9, 0, 4, 0, 6, 0, 0, 0, 5, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7';
    expect(validateInput(boardString2)).toEqual(false);
})

test('test validate input function 3', () => {
    const boardString3 = '7, 8, 0, 4, 0, 0, 1, 2, 0, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7';
    expect(validateInput(boardString3)).toEqual(false);
})