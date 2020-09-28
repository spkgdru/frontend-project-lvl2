import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const parcers = { plain, stylish, json };

export default (diff, format) => parcers[format](diff);
