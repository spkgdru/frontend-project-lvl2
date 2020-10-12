/* eslint-disable no-underscore-dangle */

import yaml from 'js-yaml';
import ini from 'ini';
import parser from '../src/parsers.js';

test('parse JSON', () => {
  const content = '{"key1":123,"key2":"abc","key3":true,"key4":[1,"a",[11]],"key5":{"innerKey1":789,"innerKey2":"xyz","innerKey3":{"z":"fff"}}}';
  const parsed = parser({ content, extname: 'json' });
  expect(parsed).toEqual(JSON.parse(content));
});

test('parse YAML', () => {
  const content = '---\nkey1: 123\nkey2: abc\nkey3: true\nkey4:\n- 1\n- a\n- - 11\nkey5:\n  innerKey1: 789\n  innerKey2: xyz\n  innerKey3:\n    z: fff;';
  const parsed = parser({ content, extname: 'yaml' });
  expect(parsed).toEqual(yaml.safeLoad(content));
});

test('parse INI', () => {
  const content = 'key1=zzz\nkey2=abc\nkey3=true\nkey4[]=x\nkey4[]=y\nkey4[]=z\n\n[key5]\ninnerKey1=789\ninnerKey2=xyz\n\n[key5.innerKey3]\nz=fff';
  const parsed = parser({ content, extname: 'ini' });
  expect(parsed).toEqual(ini.decode(content));
});
