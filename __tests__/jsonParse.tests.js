import path from 'path';
import fs from 'fs/promises';
import jsonParse from '../parsers.js';

describe('Тестирование jsonParse', () => {
		test('Парсит валидный JSON', async () => {
				// Создаём временный файл
				const tempFilePath = path.join(__dirname, 'temp.json');
				await fs.writeFile(tempFilePath, JSON.stringify({ key: 'value' }));

				// Проверяем, что jsonParse вернёт объект
				const data = await jsonParse(tempFilePath);
				expect(data).toEqual({ key: 'value' });

				// Удаляем временный файл
				await fs.unlink(tempFilePath);
		});
});

