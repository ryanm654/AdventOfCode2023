import * as fs from 'fs';
import { parseSequencesFromString, sumExtrapolatedValues } from './utils/oasisValueExtrapolator';

const puzzleInput: string = fs.readFileSync('./day9/puzzleInput', 'utf-8');
const sequences: Array<Array<number>> = parseSequencesFromString(puzzleInput);

// Part 1
console.log(sumExtrapolatedValues(sequences));

// Part 2
const reversedSequences: Array<Array<number>> = sequences.map((sequence) => sequence.reverse());
console.log(sumExtrapolatedValues(reversedSequences));