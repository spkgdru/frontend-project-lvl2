export default (object1, object2) => {
  const builder = (innerObject1, innerObject2, parentValue) => {
    const keys = Object.keys({ ...innerObject1, ...innerObject2 });
    return keys.reduce((acc, key) => {
      if ((innerObject1[key] && innerObject2[key]) && ((typeof (innerObject1[key]) === 'object') && (typeof (innerObject2[key]) === 'object'))) {
        acc[key] = { status: 'object', parent: parentValue, children: builder(innerObject1[key], innerObject2[key]) };
      } else if (innerObject1[key] && !innerObject2[key]) {
        acc[key] = { status: 'deleted', parent: parentValue, oldValue: innerObject1[key] };
      } else if (innerObject2[key] && !innerObject1[key]) {
        acc[key] = { status: 'added', parent: parentValue, value: innerObject2[key] };
      } else if ((innerObject1[key] && innerObject2[key]) && (innerObject1[key] !== innerObject2[key])) {
        acc[key] = {
          status: 'modified', parent: parentValue, oldValue: innerObject1[key], value: innerObject2[key],
        };
      } else {
        acc[key] = { status: 'nonModified', parent: parentValue, value: innerObject2[key] };
      }
      return acc;
    }, {});
  };
  return builder(object1, object2);
};
