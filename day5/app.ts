import * as fs from 'fs';
import { buildAlamanacFromPuzzleInput } from './utils/almanacBuilderUtils';
import { findLowestLocationGivenAlmanac, findLowestLocationGivenAlmanacWithSeedRanges } from './utils/almanacTraversalUtils';

const puzzleInput = fs.readFileSync('./day5/puzzleInput', 'utf-8');
const almanac = buildAlamanacFromPuzzleInput(puzzleInput);

// Part 1
// console.log(findLowestLocationGivenAlmanac(almanac));

// Part 2
console.log(findLowestLocationGivenAlmanacWithSeedRanges(almanac));