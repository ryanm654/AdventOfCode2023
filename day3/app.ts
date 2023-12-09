import * as fs from 'fs';
import { findAndSumEnginePartNumbers, findAndSumGearRatios } from './utils/EnginePartFinder';

const puzzleInput = fs.readFileSync('./day3/puzzleInput', 'utf-8');
console.log(findAndSumEnginePartNumbers(puzzleInput));
console.log(findAndSumGearRatios(puzzleInput));