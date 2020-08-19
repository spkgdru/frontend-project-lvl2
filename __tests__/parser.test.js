/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import parser from '../src/parsers.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

test('parse JSON 1', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/json/simpleConfig.json');
  const parsedContent = parser(filepath);
  const readedContent = fs.readFileSync(filepath, 'utf-8');
  expect(parsedContent).toEqual(JSON.parse(readedContent));
});

test('parse unsupported file', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/json/simpleConfig.scr');
  expect(() => {
    parser(filepath);
  }).toThrow();
});

test('parse unexisting file', () => {
  const fakePath = path.resolve(__dirname, './__fixtures__/json/fakeConfig.json');
  expect(() => {
    parser(fakePath);
  }).toThrow();
});
