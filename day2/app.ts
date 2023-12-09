import * as fs from 'fs';
import { CubeGameInputs } from "./types/cubeGameTypes";
import { getCubeGameArrayFromPuzzleInput } from "./utils/stringParsingUtils";
import { sumPossibleGameIDs, sumPowerValues } from "./utils/cubeGameUtils";

const puzzleInput = fs.readFileSync('./day2/puzzleInput.txt', 'utf-8');
const cubeGames: Array<CubeGameInputs> = getCubeGameArrayFromPuzzleInput(puzzleInput);
console.log(sumPossibleGameIDs(cubeGames, 12, 14, 13));
console.log(sumPowerValues(cubeGames));