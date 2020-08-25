const statusHandler = (param) => {
  const { key, status, path } = param;
  const previousValue = typeof param.previousValue === 'object' ? '[complex value]' : param.previousValue;
  const currentValue = typeof param.currentValue === 'object' ? '[complex value]' : param.currentValue;
  const name = path.length > 0 ? `${path.join('.')}.${key}` : `${key}`;
  let output = '';
  switch (status) {
    case 'added':
      output = `Property ${name} was added with value: ${currentValue}`;
      break;
    case 'deleted':
      output = `Property ${name} was removed`;
      break;
    case 'changed':
      output = `Property ${name} was updated. From ${previousValue} to ${currentValue}`;
      break;
    default:
      output = '';
  }
  return output;
};

const toPlain = (diffData) => diffData.reduce((acc, value) => {
  if (value.children) return toPlain(value.children);
  if (value.status === 'unmodified') return acc;
  return `${acc + statusHandler(value)}\n`;
}, '');

export default toPlain;
