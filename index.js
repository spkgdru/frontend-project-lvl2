import parser from './src/parser.js';
import diffBuilder from './src/diffBuilder.js';
import stylish from './src/formatters/stylish.js';
import json from './src/formatters/json.js';

const formatters = { stylish, json };

export default (filepath1, filepath2, format = 'stylish') => {
  const [parsed1, parsed2] = [parser(filepath1), parser(filepath2)];
  const diff = diffBuilder(parsed1, parsed2);
  return formatters[format](diff);
};
