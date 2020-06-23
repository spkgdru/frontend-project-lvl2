
export default (object1, object2) => {
  const keys = Object.keys({...object1, ...object2});
  const diff =  keys.reduce((acc, value) => {
    if (object1[value] && !object2[value]) return acc + ` - ${value}: ${object1[value]}\n`;
    if (!object1[value] && object2[value]) return acc + ` + ${value}: ${object2[value]}\n`;
    if (object1[value] !== object2[value]) return acc + ` + ${value}: ${object2[value]}\n - ${value}: ${object1[value]}\n`;
    return acc;
  }, "");
  return "{\n" + diff + "}";

}
