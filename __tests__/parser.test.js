/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from '../src/parsers.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

test('parse JSON', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/json/config1.json');
  const parsedContent = parser(filepath);
  const readedContent = fs.readFileSync(filepath, 'utf-8');
  expect(parsedContent).toEqual(JSON.parse(readedContent));
});

test('parse YAML', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/yaml/config.yaml');
  const parsedContent = parser(filepath);
  const readedContent = fs.readFileSync(filepath, 'utf-8');
  expect(parsedContent).toEqual(yaml.safeLoad(readedContent));
});

test('parse INI', () => {
  const filepath = path.resolve(__dirname, './__fixtures__/ini/config.ini');
  const parsedContent = parser(filepath);
  const readedContent = fs.readFileSync(filepath, 'utf-8');
  expect(parsedContent).toEqual(ini.decode(readedContent));
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
