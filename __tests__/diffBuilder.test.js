import diff from '../src/diffBuilder.js';

test('makeDiff1', () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const obj2 = { a: 1, c: 33, d: 4, e: 55, f: 66 };
    expect(diff(obj1, obj2)).toEqual([ [ "b", 2, undefined], ["c", 3, 33], ["e", 5, 55], ["f", undefined, 66] ]);
});
