import plain from './toPlain.js';
import stylish from './toStylish.js';
import json from './toJson.js';

const diffHandler = {
  plain, stylish, json,
};

export default (diffData, format) => diffHandler[format](diffData);
