/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filepath1 = path.resolve(__dirname, './__fixtures__/yaml/file1.yaml');
const filepath2 = path.resolve(__dirname, './__fixtures__/yaml/file2.yaml');

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
