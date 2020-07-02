import diff from '../src/diffBuilder.js';

test('diffBuilder1', () => {
  const obj1 = {
    a: 1, b: 2, c: 3, d: 4, e: 5,
  };
  const obj2 = {
    a: 1, c: 33, d: 4, e: 55, f: 66,
  };
  expect(diff(obj1, obj2)).toEqual({
    a: { status: 'nonModified', value: 1 },
    b: { status: 'deleted', oldValue: 2 },
    c: { status: 'modified', oldValue: 3, value: 33 },
    d: { status: 'nonModified', value: 4 },
    e: { status: 'modified', oldValue: 5, value: 55 },
    f: { status: 'added', value: 66 },
  });
});
