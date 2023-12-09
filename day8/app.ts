import * as fs from 'fs';
import { findStepsToReachZSimul, findStepsToReachZZZ } from './utils/networkUtils';

const input: string = fs.readFileSync('./day8/puzzleInput', 'utf-8');

// Part 1
console.log(findStepsToReachZZZ(input));

// Part 2
console.log(findStepsToReachZSimul(input));