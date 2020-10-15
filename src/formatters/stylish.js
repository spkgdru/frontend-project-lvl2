import _ from 'lodash';

const indent = ' ';
const indentLength = 4;
const currentIndent = indent.repeat(indentLength);

const render = (data, shift = 0) => {
  const printResult = (result, level) => `{\n${result.join('\n')}\n${currentIndent.repeat(level)}}`;
  const stringRender = (value, depth) => {
    const currentShift = depth + 1;
    const keyRendered = `${currentIndent.repeat(currentShift) + value.key}: `;
    const printComplexValue = (complexValue) => {
      const values = Object.entries(complexValue);
      const result = values.map((entry) => {
        const [key, currentValue] = entry;
        return stringRender({ key, currentValue }, currentShift);
      });
      return printResult(result, currentShift);
    };
    const typeDispatch = {
      added: ['+'],
      deleted: ['-'],
      changed: ['-', '+'],
      unmodified: [' '],
      nested: ['*'],
      undefined: [' '],
    };
    const typeOfValue = typeDispatch[value.status];
    return typeOfValue.map((type) => {
      if (type === '*') return `${keyRendered}${render(value.children, currentShift)}`;
      const usedValue = type === '-' ? value.previousValue : value.currentValue;
      const valueRendered = _.isPlainObject(usedValue) ? printComplexValue(usedValue) : usedValue;
      const result = keyRendered + valueRendered;
      return (_.padStart(`${type} ${_.trim(result)}`, result.length, indent));
    });
  };
  const result = data.reduce((acc, value) => {
    const newElement = stringRender(value, shift);
    return [...acc, ...newElement];
  }, '');
  return printResult(result, shift);
};

export default (diffData) => render(diffData);
