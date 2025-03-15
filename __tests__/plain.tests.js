import genDiff from '../gendiff.js';
import {describe, test, expect} from '@jest/globals';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('genDiff plain format', () => {
  const filepath1 = path.join(__dirname, '.', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '.', '__fixtures__', 'file2.json');
  const expectedOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  test('should produce correct plain format output', async () => {
    const diff = await genDiff(filepath1, filepath2, 'plain');
    expect(diff).toEqual(expectedOutput);
  });
});
