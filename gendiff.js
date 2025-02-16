import { Command } from "commander";
import jsonParse from "./jsonParse.js"
import path from "path";



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

        console.log(data1);
        console.log(data2);
    });

program.parse(process.argv);