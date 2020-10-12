/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filepath1 = path.resolve(__dirname, './__fixtures__/json/file1.json');
const filepath2 = path.resolve(__dirname, './__fixtures__/json/file2.json');
const unsupportedFile = path.resolve(__dirname, './__fixtures__/json/file1.scr');
const fakeFilepath = path.resolve(__dirname, './__fixtures__/json/fakeConfig.json');

test('gendiffInStylish', () => {
  const diffFilepath = path.resolve(__dirname, './__fixtures__/results/diff1');
  const result = fs.readFileSync(diffFilepath, 'utf-8');
  expect(gendiff(filepath1, filepath2)).toBe(result.trim());
});

test('gendiffInPlain', () => {
  const diffFilepath = path.resolve(__dirname, './__fixtures__/results/diff2');
  const result = fs.readFileSync(diffFilepath, 'utf-8');
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(result.trim());
});

test('gendiffInJSON', () => {
  const diffFilepath = path.resolve(__dirname, './__fixtures__/results/diff3');
  const result = fs.readFileSync(diffFilepath, 'utf-8');
  expect(gendiff(filepath1, filepath2, 'json')).toBe(result.trim());
});

test('use unsupported file', () => {
  expect(() => {
    gendiff(filepath1, unsupportedFile);
  }).toThrow();
  expect(() => {
    gendiff(unsupportedFile, filepath2);
  }).toThrow();
});

test('use unexisting file', () => {
  expect(() => {
    gendiff(fakeFilepath, filepath2);
  }).toThrow();
  expect(() => {
    gendiff(fakeFilepath, filepath2);
    gendiff(filepath1, fakeFilepath);
  }).toThrow();
});
