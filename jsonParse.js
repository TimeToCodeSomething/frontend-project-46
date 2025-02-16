// jsonParse.js
import fsp from 'fs/promises';

export default async function jsonParse(filepath) {
    try {
        const data = await fsp.readFile(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        throw e;
    }
}
