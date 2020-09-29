import _ from 'lodash';

const baseIntend = ' ';
const defaultIntendWidth = 4;
const currentIntend = baseIntend.repeat(defaultIntendWidth);

const printComplexValue = (value, depth) => {
  const keys = Object.keys(value);
  const formattedComplexValue = keys.map((key) => {
    if (!_.isPlainObject(value[key])) return `${currentIntend.repeat(depth)}${key}: ${value[key]}`;
    return `${currentIntend.repeat(depth)}${key}: ${printComplexValue(value[key], depth + 1)}`;
  });
  return `{\n${formattedComplexValue.join('\n')}\n${currentIntend.repeat(depth - 1)}}`;
};

export default (diff) => {
  const format = (diffArray, depth = 1) => {
    const closedBracketIntend = currentIntend.repeat(depth - 1);
    const formattedDiff = diffArray.reduce((acc, value) => {
      const buildString = param => `${currentIntend.repeat(depth)}${value.key}: ${_.isPlainObject(param) ? printComplexValue(param, depth + 1) : param}`;
      switch (value.status) {
        case 'added':
          acc.push(_.padStart(`+ ${_.trim(buildString(value.currentValue))}`, buildString(value.currentValue).length));
          break;
        case 'deleted':
          acc.push(_.padStart(`- ${_.trim(buildString(value.previousValue))}`, buildString(value.previousValue).length));
          break;
        case 'changed':
          acc.push(`${_.padStart(`- ${_.trim(buildString(value.previousValue))}`, buildString(value.previousValue).length)}\n${_.padStart(`+ ${_.trim(buildString(value.currentValue))}`, buildString(value.currentValue).length)}`);
          break;
        case 'nested':
          acc.push(`${currentIntend.repeat(depth)}${value.key}: ${format(value.children, depth + 1)}`);
          break;
        default:
          acc.push(buildString(value.currentValue));
      }
      return acc;
    }, []);
    return `{\n${formattedDiff.join('\n')}\n${closedBracketIntend}}`;
  };
  return format(diff);
};
