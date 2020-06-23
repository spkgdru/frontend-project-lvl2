import fs from 'fs';
import path from 'path';
import process from 'process';
import * as parsers from './parsers.js';
import compare from './compare.js';

export default (file1, file2, format) => {
  checkPath
  const content1 = fs.readFileSync(file1, "utf-8");
  const content2 = fs.readFileSync(file2, "utf-8");
  const parsed1 = parsers[format](content1);
  const parsed2 = parsers[format](content2);
  return compare(parsed1, parsed2);
}
