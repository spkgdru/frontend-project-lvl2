import _ from 'lodash';

const getStatus = (previousValue, currentValue) => {
  if (!previousValue) return 'added';
  if (!currentValue) return 'deleted';
  if (_.isEqual(previousValue, currentValue)) return 'unmodified';
  if (_.isPlainObject(previousValue) && _.isPlainObject(currentValue)) return 'nested';
  return 'changed';
};

export default (config1, config2) => {
  const buildDiff = (object1, object2, path = []) => {
    const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
    return keys.reduce((acc, key) => {
      const previousValue = object1[key];
      const currentValue = object2[key];
      const status = getStatus(previousValue, currentValue);
      const diffElement = {
        key, previousValue, currentValue, status, path,
      };
      if (status === 'nested') {
        diffElement.children = buildDiff(previousValue, currentValue, [...path, key]);
      }
      return [...acc, diffElement];
    }, []);
  };
  return buildDiff(config1, config2);
};
