import parsers from './src/parsers.js';
import genDiff from './src/diffBuilder.js';
import formatters from './src/formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const [parsed1, parsed2] = [parsers(filepath1), parsers(filepath2)];
  const diff = genDiff(parsed1, parsed2);
  return formatters(diff, format);
};
