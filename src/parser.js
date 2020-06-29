import path from 'path';
import fs from 'fs';

const filetypeHandler = {
  ".ini": (data) => data,
  ".json": (data) => JSON.parse(data),
  ".yml": (data) => data, 
}

export default(filepath) => {
  const filetype = path.extname(filepath);
  if (!filetypeHandler[filetype]) return null;
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  return filetypeHandler[filetype](fileData);  
}
