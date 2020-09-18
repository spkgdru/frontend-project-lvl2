import _ from 'lodash';

const baseIntend = ' ';
const defaultIntendWidth = 4;
const currentIntend = baseIntend.repeat(defaultIntendWidth);

export default (diff) => {
  const format = (diffArray, depth = 0) => {
    const closedBracketIntend = currentIntend.repeat(depth);
    const formattedDiff = diffArray.reduce((acc, value) => {
      const stringType1 = `${currentIntend.repeat(value.depth)}${value.key}: ${value.currentValue}`;
      const stringType2 = `${currentIntend.repeat(value.depth)}${value.key}: ${value.previousValue}`;
      switch (value.status) {
        case 'added':
          acc.push(_.padStart(`+ ${_.trim(stringType1)}`, stringType1.length));
          break;
        case 'deleted':
          acc.push(_.padStart(`- ${_.trim(stringType2)}`, stringType2.length));
          break;
        case 'changed':
          acc.push(`${_.padStart(`+ ${_.trim(stringType1)}`, stringType1.length)}\n${_.padStart(`- ${_.trim(stringType2)}`, stringType2.length)}`);
          break;
        case 'nested':
          acc.push(`${currentIntend.repeat(value.depth)}${value.key}: ${format(value.children, depth + 1)}`);
          break;
        default:
          acc.push(stringType1);
      }
      return acc;
    }, []);
    return `{\n${formattedDiff.join('\n')}\n${closedBracketIntend}}`;
  };
  return format(diff);
};
