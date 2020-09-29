import _ from 'lodash';

const performValue = (value) => {
  if (_.isObjectLike(value)) return '[complex value]';
  if (_.isBoolean(value) || _.isNull(value)) return value;
  return `'${value}'`;
};

const elementToString = (element, path) => {
  const {
    key, status, currentValue, previousValue,
  } = element;
  const name = path.length > 0 ? `${path.join('.')}.${key}` : `${key}`;
  switch (status) {
    case 'added':
      return `Property '${name}' was added with value: ${performValue(currentValue)}`;
    case 'deleted':
      return `Property '${name}' was removed`;
    default:
      return `Property '${name}' was updated. From ${performValue(previousValue)} to ${performValue(currentValue)}`;
  }
};

export default (diff) => {
  const format = (diffData, path = []) => diffData.reduce((acc, value) => {
    if (value.children) return [...acc, ...format(value.children, [...path, value.key])];
    if (value.status === 'unmodified') return acc;
    return [...acc, elementToString(value, path)];
  }, []);
  const result = format(diff).join('\n');
  return result;
};
