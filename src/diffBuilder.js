import _ from 'lodash';

const getStatus = (previousValue, currentValue) => {
  if (!previousValue) return 'added';
  if (!currentValue) return 'deleted';
  if (_.isEqual(previousValue, currentValue)) return 'unmodified';
  if (_.isPlainObject(previousValue) && _.isPlainObject(currentValue)) return 'nested';
  return 'changed';
};

export default (config1, config2) => {
  const buildDiff = (object1, object2) => {
    const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
    return keys.reduce((acc, key) => {
      const previousValue = object1[key];
      const currentValue = object2[key];
      const status = getStatus(previousValue, currentValue);
      const newElement = {
        key, previousValue, currentValue, status,
      };
      if (status === 'nested') {
        newElement.children = buildDiff(previousValue, currentValue);
      }
      return [...acc, newElement];
    }, []);
  };
  return buildDiff(config1, config2);
};
