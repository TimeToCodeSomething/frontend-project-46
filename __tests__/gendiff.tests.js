import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { describe, test, expect } from '@jest/globals';

// Определяем __dirname вручную для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('gendiff CLI', () => {
		// Путь к скрипту gendiff.js (на уровень выше)
		const gendiffPath = join(__dirname, '..', 'gendiff.js');

		test('should generate correct diff for JSON __fixtures__', (done) => {
				const file1 = join(__dirname, '__fixtures__', 'file1.json');
				const file2 = join(__dirname, '__fixtures__', 'file2.json');

				execFile('node', [gendiffPath, file1, file2], (error, stdout) => {
						expect(error).toBeNull();
						// Проверяем, что вывод содержит ожидаемые фрагменты
						expect(stdout).toContain('- setting2: 200');
						expect(stdout).toContain('- setting3: true');
						expect(stdout).toContain('+ setting3: null');
						done();
				});
		});

		test('should show error with non-existent __fixtures__', (done) => {
				const nonExistent1 = join(__dirname, '__fixtures__', 'nonexist1.json');
				const nonExistent2 = join(__dirname, '__fixtures__', 'nonexist2.json');

				execFile('node', [gendiffPath, nonExistent1, nonExistent2], (error, stdout, stderr) => {
						// Ожидаем ошибку, так как файлы не существуют
						expect(error).not.toBeNull();
						// Проверяем, что в stderr есть упоминание "Error:"
						expect(stderr).toContain('Error:');
						done();
				});
		});
});
