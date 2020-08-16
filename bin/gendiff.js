#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(console.log(genDiff(...program.args, program.format)))
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);


