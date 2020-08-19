import parser from './src/parsers.js';
import diffBuilder from './src/diffBuilder.js';
import formatter from './src/formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const [parsed1, parsed2] = [parser(filepath1), parser(filepath2)];
  const diff = diffBuilder(parsed1, parsed2);
  return formatter(diff, format);
};
