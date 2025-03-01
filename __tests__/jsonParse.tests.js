import jsonParse from '../jsonParse.js';
import fs from 'fs/promises';
import path from 'path';

describe('jsonParse', () => {
		test('корректно парсит валидный JSON', async () => {
				const tempFile = path.join(__dirname, 'temp.json');
				const jsonData = JSON.stringify({ key: 'value' });
				await fs.writeFile(tempFile, jsonData);

				const data = await jsonParse(tempFile);
				expect(data).toEqual({ key: 'value' });

				await fs.unlink(tempFile);
		});
});
