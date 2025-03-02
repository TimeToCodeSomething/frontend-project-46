import fs from 'fs/promises';
import path from 'path';
import { describe, beforeAll, afterAll, test, expect } from "@jest/globals"


describe('Тестирование gendiff CLI', () => {
		let file1Path, file2Path;

		beforeAll(async () => {
				// Создаем директорию для фикстур, если нужно
				const fixturesDir = path.resolve(__dirname, 'fixtures');
				await fs.mkdir(fixturesDir, { recursive: true });

				file1Path = path.join(fixturesDir, 'file1.json');
				file2Path = path.join(fixturesDir, 'file2.json');

				// Пример содержимого файлов
				const data1 = JSON.stringify({ a: 1, b: 2, c: 3 });
				const data2 = JSON.stringify({ a: 1, b: 20, d: 4 });
				await fs.writeFile(file1Path, data1);
				await fs.writeFile(file2Path, data2);
		});

		afterAll(async () => {
				// Удаляем созданные файлы
				await fs.unlink(file1Path);
				await fs.unlink(file2Path);
		});

		test('Выводит корректный дифф', async () => {
				// Путь к твоему gendiff.js. Скорее всего он находится в корне проекта.
				const gendiffPath = path.resolve(__dirname, '../gendiff.js');
				const { stdout } = await execAsync(`node ${gendiffPath} ${file1Path} ${file2Path}`);

				// Ожидаемый вывод (ключи объединяются и сортируются):
				// Для ключа "a": одинаковые значения -> "    a: 1"
				// Для ключа "b": разные значения -> "  - b: 2" и "  + b: 20"
				// Для ключа "c": только в file1 -> "  - c: 3"
				// Для ключа "d": только в file2 -> "  + d: 4"
				const expectedOutput = `{
    a: 1
  - b: 2
  + b: 20
  - c: 3
  + d: 4
}`;
				expect(stdout.trim()).toBe(expectedOutput.trim());
		});
});
