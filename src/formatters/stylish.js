const keyStatusHandlers = {
  nonModified: (key) => `     ${key}: ${key[value]}`,
  added: (key) => `  + ${key}: ${key[value]}`,
  deleted: (key) => `  - ${key}: ${key[oldValue]}`,
  modified: (key) => `  - ${key}: ${key[oldValue]}\n  + ${key}: ${key[value]}`
}

const stylishBuilder =  diffObject => {
  const keys = Object.keys(diffObject);
  const diffColl = keys.reduce((acc, key) => {
    if (diffObject[key][status] === 'object') {
      acc.push(stylishBuilder(diffObject[key]));
      return acc;
    }
    acc.push(keyStatusHandlers[diffObject[key][status]](diffObject[key]);
    return acc;
  }, []);
  return "\n{\n" + diffColl.join("\n") + "\n}";
}

export default stylishBuilder;

