import _ from 'lodash';

const baseIndentWidth = 2;

const isComplex = value => {
    return _.isPlainObject(value)
};

const printComplexValue = (value, currentIndent) => {
  const space = " ";
  const prefix = "{\n";
  const suffix = `\n${space.repeat(currentIndent)}}`;
  const values = Object.entries(value);
  const formattedValues = values.reduce((acc, [key, currentValue]) => {
    const head = `${" ".repeat(currentIndent + baseIndentWidth)}${key}: `;
    const body = isComplex(currentValue) ? printComplexValue(currentValue, currentIndent + baseIndentWidth) : `${currentValue}`;
    return [...acc, head + body];
  }, []);
  return `${prefix}${formattedValues.join("\n")}${suffix}`;
}

const formatValue = value => {
  const {key, previousValue, currentValue, status, level} = value;
  const currentIndentWidth = baseIndentWidth + level.length * baseIndentWidth
  const result = [];
  const currentShift = ' '.repeat(currentIndentWidth);
  switch(status) {
    case "added":
      result.push(`+ ${key}: ${isComplex(currentValue) ? printComplexValue(currentValue, currentIndentWidth) : currentValue}`);
      break;
    case "deleted":
      result.push(`- ${key}: ${isComplex(previousValue) ? printComplexValue(previousValue, currentIndentWidth + 2) : previousValue}`);
      break;
    case "changed":
      result.push(`- ${key}: ${previousValue}`);
      result.push(`+ ${key}: ${currentValue}`);
      break;
    default:
      result.push(`  ${key}: ${isComplex(currentValue) ? printComplexValue(currentValue, currentIndentWidth) : currentValue}`);
  }
  return result.map(string => currentShift + string).join('\n');
};

const buildStylish = diffData => {
  const result = diffData.reduce((acc, param) => {
    if (_.has(param, "children")) return [...acc, `${param.key}: ${buildStylish(param.children)}`];
    return [...acc, formatValue(param)];
  }, []);
  return `{\n${result.join('\n')}\n}`;
}

export default buildStylish;
