import genDiff from '../gendiff.js';
import {describe, test, expect} from '@jest/globals';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('genDiff json format', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.json');

  test('should produce valid JSON output', async () => {
    const output = await genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(output)).not.toThrow();
  });
});
