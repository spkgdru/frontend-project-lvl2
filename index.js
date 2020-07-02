import parser from './src/parser.js';

export default (filepath1, filepath2, format) => {
  console.log(filepath1, filepath2, format);
  console.log(parser(filepath1));
};
