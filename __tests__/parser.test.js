import path from 'path';
import parser from '../src/parser.js';

const dirname = path.dirname(new URL(import.meta.url).pathname);

test('parserJSON', () => {
  expect(parser(path.resolve(dirname, './__fixtures__/smallBefore.json'))).toEqual({
    a: '1', b: '2', c: '3', d: '4', e: '5', f: '6',
  });
});

test('parserYML', () => {
  const ymlData = parser(path.resolve(dirname, './__fixtures__/case1.yml'));
  expect(ymlData).toEqual({
    env: {
      node: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/recommended',
    ],
    plugins: [
      'jest',
    ],
    rules: {
      'import/extensions': 0,
      'no-console': 0,
    },
  });
});

test('parserINI', () => {
  const iniData = parser(path.resolve(dirname, './__fixtures__/foo.ini'));
  expect(iniData).toEqual({});
});
