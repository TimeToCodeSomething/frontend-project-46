// parsers.js (синхронная версия)
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parseFile(filepath) {
  const data = fs.readFileSync(filepath, 'utf-8');
  const ext = path.extname(filepath).toLowerCase();

  if (ext === '.json') {
    return JSON.parse(data);
  } if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file extension: ${ext}`);
}
