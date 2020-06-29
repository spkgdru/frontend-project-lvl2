export default (obj1, obj2) => {
    const allKeys = Object.keys({...obj1, ...obj2});
    return allKeys.reduce((acc, value) => {
        if (obj1[value] !== obj2[value]) {
            return [...acc, [value, obj1[value], obj2[value]]];
        }
        return acc;
    }, []);
};
