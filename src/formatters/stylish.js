import _ from 'lodash';

const indentSymbol = ' ';
const spacesCount = 4;

const printValue = (value, indentLevel) => {
    if ((!_.isPlainObject(value)) || (value === null)) return value;
    const screenLines = Object.entries(value).map(([paramName, paramValue]) => {
        const outputIndent = indentSymbol.repeat(spacesCount * indentLevel);
        const outputValue = paramName + `: ` + printValue(paramValue, indentLevel + 1);
        return outputIndent + outputValue;
    });
    const closingBracketLine = indentSymbol.repeat(spacesCount * (indentLevel - 1)) + '}'; 
    return ['{', ...screenLines, closingBracketLine].join('\n');
}

export default (diff) => {
    const iter = (sourceDiff, depth = 1) => {
        const indentLine = indentSymbol.repeat(spacesCount * depth - 2);
        const closingBracket = indentSymbol.repeat(spacesCount * (depth - 1)) + '}';
        const lines = sourceDiff.reduce((acc, value) => {
            if (value.status === 'nested') {
                const output = `  ${value.key}: ${iter(value.children, depth + 1)}`; 
                return [...acc, indentLine + output];
            } 
            else if (value.status === 'added') {
                const output = `+ ${value.key}: ${printValue(value.currentValue, depth + 1)}`;
                return [...acc, indentLine + output];
            }
            else if (value.status === 'deleted') {
                const output = `- ${value.key}: ${printValue(value.previousValue, depth + 1)}`;
                return [...acc, indentLine + output];
            }
            else if (value.status === 'unmodified') {
                const output = `  ${value.key}: ${printValue(value.currentValue, depth + 1)}`;
                return [...acc, indentLine + output];
            }
            else if (value.status === 'changed') {
                const output1 = `- ${value.key}: ${printValue(value.previousValue, depth + 1)}`;
                const output2 = `+ ${value.key}: ${printValue(value.currentValue, depth + 1)}`;
                return [...acc, indentLine + output1, indentLine + output2];
            }
            return acc;  
        }, []);
        return ['{', ...lines, closingBracket].join('\n');
    }
    return iter(diff);
}
