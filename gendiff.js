#!/usr/bin/env node
import formatters from './formatters/index.js';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import path from 'path';

export function genDiff(filepath1, filepath2, format = 'stylish') {
    const fullPath1 = path.resolve(filepath1);
    const fullPath2 = path.resolve(filepath2);

    const data1 = parseFile(fullPath1);
    const data2 = parseFile(fullPath2);

    const diffTree = buildDiff(data1, data2);
    return formatters(diffTree, format || 'stylish');
}

// CLI-логика
if (process.argv[1] && (process.argv[1].endsWith('gendiff.js') || process.argv[1].endsWith('gendiff'))) {
    const program = new Command();
    program
        .name('gendiff')
        .version('1.0.0')
        .description('Compares two configuration files and shows a difference.')
        .option('-f, --format [type]', 'output format')
        .arguments('<filepath1> <filepath2>')
        .action((filepath1, filepath2, options) => {
            try {
                const output = genDiff(filepath1, filepath2, options.format);
                console.log(output);
            } catch (error) {
                console.error(`Error: ${error.message}`);
                process.exit(1);
            }
        });

    program.parse(process.argv);
}

export default genDiff;
