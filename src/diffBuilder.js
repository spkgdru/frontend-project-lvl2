const builder = (object1, object2) => {
  const keys = Object.keys({ ...object1, ...object2 });
  return keys.reduce((acc, value) => {
    if ((object1[value] && object2[value]) && ((typeof (object1[value]) === 'object') && (typeof (object2[value]) === 'object'))) {
      acc[value] = { status: 'object', children: builder(object1[value], object2[value]) };
    } else if (object1[value] && !object2[value]) {
      acc[value] = { status: 'deleted', oldValue: object1[value] };
    } else if (object2[value] && !object1[value]) {
      acc[value] = { status: 'added', value: object2[value] };
    } else if ((object1[value] && object2[value]) && (object1[value] !== object2[value])) {
      acc[value] = { status: 'modified', oldValue: object1[value], value: object2[value] };
    } else {
      acc[value] = { status: 'nonModified', value: object2[value] };
    }
    return acc;
  }, {});
};

export default builder;
