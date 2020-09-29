/* eslint-disable no-underscore-dangle */

// import fs from 'fs';
import path from 'path';
// import yaml from 'js-yaml';
// import ini from 'ini';
import parser from '../src/parsers.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const preparedData = {
  key1: 123,
  key2: 'abc',
  key3: true,
  key4: [1, 'a', [11]],
  key5: {
    innerKey1: 789,
    innerKey2: 'xyz',
    innerKey3: { z: 'fff' },
  },
};

const preparedDataFromINI = {
  key1: 'zzz',
  key2: 'abc',
  key3: true,
  key4: ['x', 'y', 'z'],
  key5: {
    innerKey1: '789',
    innerKey2: 'xyz',
    innerKey3: { z: 'fff' },
  },
};

test('parse JSON', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/json/config1.json');
  const parsedContent = parser(filepath);
  expect(parsedContent).toEqual(preparedData);
});

test('parse YAML', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/yaml/config1.yaml');
  const parsedContent = parser(filepath);
  expect(parsedContent).toEqual(preparedData);
});

test('parse INI', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/ini/config1.ini');
  const parsedContent = parser(filepath);
  expect(parsedContent).toEqual(preparedDataFromINI);
});

test('parse unsupported file', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/json/config1.scr');
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
