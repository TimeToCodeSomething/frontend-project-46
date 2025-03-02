// @ts-check
import {Command} from 'commander';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatDiff.js';
import path from 'path';


const program = new Command();

program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(async (filepath1, filepath2) => {
        try {
            const fullPath1 = path.resolve(filepath1);
            const fullPath2 = path.resolve(filepath2);

            const data1 = await parseFile(fullPath1);
            const data2 = await parseFile(fullPath2);

            const diffTree = buildDiff(data1, data2);
            const output = formatDiff(diffTree);
            console.log(output);
        } catch (error) {
            throw new Error('Error'. error.message);
        }
    });

program.parse(process.argv);
