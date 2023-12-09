import * as fs from 'fs';
import { findTotalCopiesOfScratchCards, sumPointsFromListOfCards } from './utils/scratchCardUtils';

const puzzleInput = fs.readFileSync('./day4/puzzleInput', 'utf-8');
console.log(sumPointsFromListOfCards(puzzleInput));
console.log(findTotalCopiesOfScratchCards(puzzleInput));