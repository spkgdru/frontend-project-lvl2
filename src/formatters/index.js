import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatters = { plain, stylish, json };

export default (diff, format) => formatters[format](diff);
