import _ from 'lodash';

const indent = ' ';
const indentLength = 4;
const currentIndent = indent.repeat(indentLength);

const printComplexValue = (value, depth) => {
  const keys = Object.keys(value);
  const result = keys.map((key) => `${currentIndent.repeat(depth + 1)}${key}: ${_.isPlainObject(value[key]) ? printComplexValue(value[key], depth + 1) : value[key]}`);
  return `{\n${result.join('\n')}\n${currentIndent.repeat(depth)}}`;
};

const build = (data, depth = 0) => {
  const buildString = (value, depthLevel) => {
    const typeDispatch = {
      added: () => {
        const result = `${currentIndent.repeat(depthLevel)}${value.key}: ${_.isPlainObject(value.currentValue) ? printComplexValue(value.currentValue, depthLevel) : value.currentValue}`;
        return (_.padStart(`+ ${_.trim(result)}`, result.length, indent));
      },
      deleted: () => {
        const result = `${currentIndent.repeat(depthLevel)}${value.key}: ${_.isPlainObject(value.previousValue) ? printComplexValue(value.previousValue, depthLevel) : value.previousValue}`;
        return (_.padStart(`- ${_.trim(result)}`, result.length, indent));
      },
      changed: () => {
        const result1 = `${currentIndent.repeat(depthLevel)}${value.key}: ${_.isPlainObject(value.currentValue) ? printComplexValue(value.currentValue, depthLevel) : value.currentValue}`;
        const result2 = `${currentIndent.repeat(depthLevel)}${value.key}: ${_.isPlainObject(value.previousValue) ? printComplexValue(value.previousValue, depthLevel) : value.previousValue}`;
        return `${_.padStart(`- ${_.trim(result2)}`, result2.length, indent)}\n${_.padStart(`+ ${_.trim(result1)}`, result1.length, indent)}`;
      },
      unmodified: () => {
        const result = `${currentIndent.repeat(depthLevel)}${value.key}: ${_.isPlainObject(value.currentValue) ? printComplexValue(value.currentValue, depthLevel) : value.currentValue}`;
        return result;
      },
      nested: () => {
        const result = `${currentIndent.repeat(depthLevel)}${value.key}: ${build(value.children, depthLevel)}`;
        return result;
      },
    };
    return typeDispatch[value.status]();
  };

  const result = data.reduce((acc, value) => {
    const newString = buildString(value, depth + 1);
    return [...acc, newString];
  }, '');
  return `{\n${result.join('\n')}\n${currentIndent.repeat(depth)}}`;
};

export default (diffData) => build(diffData);
