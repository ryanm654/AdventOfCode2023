import * as fs from 'fs';
import { getCubeGameArrayFromPuzzleInput } from './stringParsingUtils';
import { CubeGameInputs } from "../types/cubeGameTypes";
import { cubeGameIsPossible, minimumCubesToPlay, minimumCubesToPlayPowerValue, sumPossibleGameIDs, sumPowerValues } from "./cubeGameUtils";
import exp from 'constants';

describe("Cube game util tests for day 2 puzzle 1", () => {
    test("Given a set of max values, a cube game with all values under the maximum should be marked as possible", () => {
        const input: CubeGameInputs = {
            gameNumber: 1,
            pulls: [{
                red: 12,
                blue: 3,
                green: 0
            },
            {
                red: 1,
                blue: 6,
                green: 2
            },
            {
                red: 0,
                blue: 0,
                green: 2
            }]
        };
        
        expect(cubeGameIsPossible(input, 12, 14, 13)).toBeTruthy();

    });

    test("Given a set of max values, a cube game with some values over the maximum should be marked as impossible", () => {
        const input: CubeGameInputs = {
            gameNumber: 1,
            pulls: [{
                red: 4,
                blue: 3,
                green: 0
            },
            {
                red: 1,
                blue: 6,
                green: 14
            },
            {
                red: 0,
                blue: 0,
                green: 2
            }]
        };
        
        expect(cubeGameIsPossible(input, 12, 14, 13)).toBeFalsy();
    });

    test("Given a set of games, sum the IDs of possible games", () => {
        const input: string = fs.readFileSync('./day2/utils/testInput.txt', 'utf-8');
        const cubeGameInputs: Array<CubeGameInputs> = getCubeGameArrayFromPuzzleInput(input);
        const expectedValue = 8;

        expect(sumPossibleGameIDs(cubeGameInputs, 12, 14, 13)).toEqual(expectedValue);
    });
});

describe("Cube game util tests for day 2 puzzle 2", () => {
    test("Given a game, find the minimum amount of cubes to play the game", () =>{
        const input: CubeGameInputs = {
            gameNumber: 1,
            pulls: [{
                red: 4,
                blue: 3,
                green: 0
            },
            {
                red: 1,
                blue: 6,
                green: 2
            },
            {
                red: 0,
                blue: 0,
                green: 2
            }]
        };
        const expectedPowerValue = 48

        expect(minimumCubesToPlayPowerValue(input)).toEqual(expectedPowerValue);
    })

    test("Given a set of games, sum the power values of the games", () => {
        const input: string = fs.readFileSync('./day2/utils/testInput.txt', 'utf-8');
        const cubeGameInputs: Array<CubeGameInputs> = getCubeGameArrayFromPuzzleInput(input);
        const expectedValue = 2286;

        expect(sumPowerValues(cubeGameInputs)).toEqual(expectedValue);
    })
})