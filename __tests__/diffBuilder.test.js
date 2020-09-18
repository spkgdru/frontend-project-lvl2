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
      key: 'a', previousValue: 1, currentValue: 1, status: 'unmodified',
    },
    {
      key: 'b', previousValue: 2, currentValue: undefined, status: 'deleted',
    },
    {
      key: 'c', previousValue: 3, currentValue: 33, status: 'changed',
    },
    {
      key: 'd', previousValue: 4, currentValue: 4, status: 'unmodified',
    },
    {
      key: 'e', previousValue: 5, currentValue: 55, status: 'changed',
    },
    {
      key: 'f', previousValue: undefined, currentValue: 66, status: 'added',
    },
  ]);
});

test('diffBuilder2', () => {
  const obj1 = {
    setting1: true,
    setting2: 33,
    setting3: 'value33',
    setting4: {
      setting41: 'value41',
      setting42: {
        setting421: false,
      },
    },
  };

  const obj2 = {
    setting1: true,
    setting2: 333,
    setting4: {
      setting42: {
        setting421: false,
      },
    },
    setting5: 3315,
  };

  const result = [
    {
      key: 'setting1', previousValue: true, currentValue: true, status: 'unmodified',
    },
    {
      key: 'setting2', previousValue: 33, currentValue: 333, status: 'changed',
    },
    {
      key: 'setting3', previousValue: 'value33', status: 'deleted',
    },
    {
      key: 'setting4',
      previousValue: {
        setting41: 'value41',
        setting42: {
          setting421: false,
        },
      },
      currentValue: {
        setting42: {
          setting421: false,
        },
      },
      status: 'nested',
      children: [{ key: 'setting41', previousValue: 'value41', status: 'deleted' }, {
        key: 'setting42',
        previousValue: {
          setting421: false,
        },
        currentValue: {
          setting421: false,
        },
        status: 'unmodified',
      }],
    },
    {
      key: 'setting5', currentValue: 3315, status: 'added',
    },
  ];

  expect(diff(obj1, obj2)).toEqual(result);
});
