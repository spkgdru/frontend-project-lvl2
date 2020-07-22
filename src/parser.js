import path from 'path';
import fs from 'fs';
import yml from 'js-yaml';
import ini from 'ini';

const filetypeHandler = {
  '.ini': (data) => ini.decode(data),
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yml.safeLoad(data),
  '.yaml': (data) => yml.safeLoad(data),
};

export default (filepath) => {
  const filetype = path.extname(filepath);
  if (!filetypeHandler[filetype]) {
    throw new Error('unsupported file format');
  }
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  return filetypeHandler[filetype](fileData);
};
