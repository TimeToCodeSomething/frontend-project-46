#!/usr/bin/env node
import {Command} from 'commander';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatDiff.js';
import path from 'path';

// Основная функция, возвращающая результат сравнения
export async function genDiff(filepath1, filepath2) {
    const fullPath1 = path.resolve(filepath1);
    const fullPath2 = path.resolve(filepath2);

    const data1 = await parseFile(fullPath1);
    const data2 = await parseFile(fullPath2);

    const diffTree = buildDiff(data1, data2);
    return formatDiff(diffTree);
}

// Запускаем CLI-логику, если этот файл вызывается напрямую
if (process.argv[1] && (process.argv[1].endsWith('gendiff.js')) || (process.argv[1].endsWith('gendiff'))) {
    const program = new Command();
    program
        .name('gendiff')
        .version('1.0.0')
        .description('Compares two configuration files and shows a difference.')
        .option('-f, --format [type]', 'output format')
        .arguments('<filepath1> <filepath2>')
        .action(async (filepath1, filepath2, options) => {
            try {
                const output = await genDiff(filepath1, filepath2);
                console.log(output);
            } catch (error) {
                console.error(`Error: ${error.message}`);
                process.exit(1);
            }
        });

    program.parse(process.argv);
}

export default genDiff;
