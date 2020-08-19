import path from 'path';
import fs from 'fs';
import yml from 'js-yaml';
import ini from 'ini';

const readConfig = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return content;
};

const defineConfigType = (filepath) => path.extname(filepath).substring(1);

const configTypeParser = {
  ini: (config) => ini.decode(config),
  json: (config) => JSON.parse(config),
  yml: (config) => yml.safeLoad(config),
  yaml: (config) => yml.safeLoad(config),
};

export default (filepath) => {
  const configType = defineConfigType(filepath);
  if (!configTypeParser[configType]) {
    throw new Error(`${configType} is unsupported config format`);
  }
  const content = readConfig(filepath);
  return configTypeParser[configType](content);
};
