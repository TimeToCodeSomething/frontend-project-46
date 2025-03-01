import {Command} from "commander";
import jsonParse from "./jsonParse.js"
import path from "path";
import _ from "lodash";


const program = new Command();

program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(async (filepath1, filepath2) => {

        const fullPath1 = path.resolve(filepath1);
        const fullPath2 = path.resolve(filepath2);

        const data1 = await jsonParse(fullPath1);
        const data2 = await jsonParse(fullPath2);

        const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
        let diffLines = [];

        keys.forEach((key) => {
            if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
                if (_.isEqual(data2[key], data1[key])) {
                    diffLines.push(`    ${key}: ${data2[key]}`);
                } else {
                    diffLines.push(`  - ${key}: ${data1[key]}`);
                    diffLines.push(`  + ${key}: ${data2[key]}`);
                }
            } else if (data1.hasOwnProperty(key)) {
                diffLines.push(`  - ${key}: ${data1[key]}`);
            } else {
                diffLines.push(`  + ${key}: ${data2[key]}`);
            }
        });

        console.log(`{\n${diffLines.join('\n')}\n}`);
    });

program.parse(process.argv);
