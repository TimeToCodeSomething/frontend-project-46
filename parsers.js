import fsp from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export default async function parseFile(filepath) {
    try {
        const data = await fsp.readFile(filepath, 'utf-8');
        const ext = path.extname(filepath).toLowerCase();

        if (ext === '.json') {
            return JSON.parse(data);
        } else if (ext === '.yaml' || ext === '.yml') {
            return yaml.load(data);
        } else {
            throw new Error(`Unsupported file extension: ${ext}`);
        }
    } catch (e) {
        throw e;
    }
}
