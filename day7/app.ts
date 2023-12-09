import * as fs from 'fs';
import { multiplyandSumWinningsForHands, multiplyandSumWinningsForHandsWithJoker } from './utils/camelCardUtils';

const puzzleInput: string = fs.readFileSync('./day7/puzzleInput', 'utf-8');

// Part 1
console.log(multiplyandSumWinningsForHands(puzzleInput));

// Part 2
console.log(multiplyandSumWinningsForHandsWithJoker(puzzleInput));