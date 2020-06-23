import path from 'path';
import fs from 'fs';

const fileTypeHandler = {
  ".ini": (data) => data,
  ".json": (data) => data,
  ".yml": (data) => data, 
}

export default(filepath) => {
  const fileType = path.extname(filepath);
  console.log(fileType);
  if (!fileTypeHandler[fileType]) return null;
  const truePath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(truePath, 'utf-8');
  return fileTypeHandler[fileType](fileData);  
}
