import * as fs from 'fs';
import { parseInputIntoTimeDistanceArray, multiplyNumberOfWaysToBeatRecordPerRace } from "./utils/boatTimeUtils";

const puzzleInput: string = fs.readFileSync('./day6/puzzleInput', 'utf-8');
const timeDistanceArray: Array<Array<number>> = parseInputIntoTimeDistanceArray(puzzleInput);

// Part 1
console.log(multiplyNumberOfWaysToBeatRecordPerRace(timeDistanceArray));