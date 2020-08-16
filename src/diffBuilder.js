import _ from 'lodash';

const checkStatus = (previousValue, currentValue) => {
  if (!previousValue) return "added";
  if (!currentValue) return "deleted";
  if (_.isEqual(previousValue, currentValue)) return "unmodified";
  if (_.isPlainObject(previousValue) && _.isPlainObject(currentValue)) return "isObject";
  return "changed"; 
}

const diffBuilder = (object1, object2, path = []) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]).sort();
  return keys.reduce((acc, key) => {
    const previousValue = object1[key];
    const currentValue = object2[key];
    const status = checkStatus(previousValue, currentValue);
    const elem = { key, previousValue, currentValue, status, path };
    if (status === "isObject") {
      elem.children = diffBuilder(previousValue, currentValue, [...path, key]);
    }
    return [...acc, elem];
  }, []);
}

export default builder;
