import parser from '../src/parser.js';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

test('parser', () => {
  expect(parser(path.resolve(__dirname, '../__fixtures__/smallBefore.json'))).toEqual({ a: '1', b: '2', c: '3', d: '4', e: '5', f: '6' });
});
