import fs from 'fs';
import path from 'path';
import parsers from './src/parsers.js';
import genDiff from './src/diffBuilder.js';
import formatters from './src/formatters/index.js';

const readConfigFile = (filepath) => {
  const extname = path.extname(filepath).substring(1);
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return { extname, content };
};

export default (filepath1, filepath2, format = 'stylish') => {
  const filedata1 = readConfigFile(filepath1);
  const filedata2 = readConfigFile(filepath2);
  const [parsed1, parsed2] = [parsers(filedata1), parsers(filedata2)];
  const diff = genDiff(parsed1, parsed2);
  return formatters(diff, format);
};
