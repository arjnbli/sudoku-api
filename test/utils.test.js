const { Cell, Counter } = require('../lib/utils.js');

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