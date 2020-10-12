import yml from 'js-yaml';
import ini from 'ini';

const configTypeParser = {
  ini: (config) => ini.decode(config),
  json: (config) => JSON.parse(config),
  yml: (config) => yml.safeLoad(config),
  yaml: (config) => yml.safeLoad(config),
};

export default ({ extname, content }) => {
  if (!configTypeParser[extname]) {
    throw new Error(`${extname} is unsupported config format`);
  }
  return configTypeParser[extname](content);
};
