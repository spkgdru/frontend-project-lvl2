export default (parsedConf1, parsedConf2) => {
  const buildDiff = (config1, config2, parents = []) => {
    const keys = Object.keys({ ...config1, ...config2 });
    return keys.reduce((acc, key) => {
      if ((typeof (config1[key]) === 'object') && (typeof (config2[key]) === 'object')) {
        acc[key] = {
          status: 'object',
          parent: parents,
          children: buildDiff(config1[key], config2[key], [...parents, key]),
        };
      } else if (config1[key] && !config2[key]) {
        acc[key] = {
          status: 'deleted',
          parent: parents,
          oldValue: config1[key],
        };
      } else if (config2[key] && !config1[key]) {
        acc[key] = {
          status: 'added',
          parent: parents,
          value: config2[key],
        };
      } else if (config1[key] !== config2[key]) {
        acc[key] = {
          status: 'modified',
          parent: parents,
          oldValue: config1[key],
          value: config2[key],
        };
      } else {
        acc[key] = {
          status: 'nonModified',
          parent: parents,
          value: config2[key],
        };
      }
      return acc;
    }, {});
  };
  return buildDiff(parsedConf1, parsedConf2);
};
