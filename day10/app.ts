import * as fs from 'fs';
import { countTilesEnclosedByLoop, findFurthestStepsFromStart } from './utils/pipeUtils';

const puzzleInput: string = fs.readFileSync('./day10/puzzleInput', 'utf-8');

// Part 1
console.log(findFurthestStepsFromStart(puzzleInput));

// Part 2
console.log(countTilesEnclosedByLoop(puzzleInput));