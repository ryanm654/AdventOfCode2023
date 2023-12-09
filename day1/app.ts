import * as fs from'fs';
import { recoverCalibrationFromText } from "./calibrationUtils";

const input = fs.readFileSync('./day1/1aInput.txt', 'utf8');
const answer = recoverCalibrationFromText(input);

console.log(answer);

