import diff from '../src/diffBuilder.js';

test('diffBuilder1', () => {
  const obj1 = {
    a: 1, b: 2, c: 3, d: 4, e: 5,
  };
  const obj2 = {
    a: 1, c: 33, d: 4, e: 55, f: 66,
  };
  expect(diff(obj1, obj2)).toEqual([
    {
      key: 'a', previousValue: 1, currentValue: 1, status: 'unmodified', path: [],
    },
    {
      key: 'b', previousValue: 2, currentValue: undefined, status: 'deleted', path: [],
    },
    {
      key: 'c', previousValue: 3, currentValue: 33, status: 'changed', path: [],
    },
    {
      key: 'd', previousValue: 4, currentValue: 4, status: 'unmodified', path: [],
    },
    {
      key: 'e', previousValue: 5, currentValue: 55, status: 'changed', path: [],
    },
    {
      key: 'f', previousValue: undefined, currentValue: 66, status: 'added', path: [],
    },
  ]);
});
