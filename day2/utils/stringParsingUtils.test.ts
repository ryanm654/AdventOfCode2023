import { CubeGameInputs } from "../types/cubeGameTypes";
import { getCubeGameArrayFromPuzzleInput, getCubeGameInputsFromLine, getNumberOfCubesFromPullGivenColour } from "./stringParsingUtils";

describe("String parser tests for day 2 puzzle 1", () => {
    test("Given a puzzle input line, it should be broken down into an object of game number and pull numbers", () => {
        const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
        const expectedResult: CubeGameInputs = {
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

        const multiDigitInput = "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
        const expectedResultMultiDigit: CubeGameInputs = {
            gameNumber: 3,
            pulls: [{
                red: 20,
                blue: 6,
                green: 8
            },
            {
                red: 4,
                blue: 5,
                green: 13
            },
            {
                red: 1,
                blue: 0,
                green: 5
            }]
        };

        const puzzleInputLine = "Game 1: 20 green, 3 red, 2 blue; 9 red, 16 blue, 18 green; 6 blue, 19 red, 10 green; 12 red, 19 green, 11 blue";
        const expectedPuzzleInputLine: CubeGameInputs = {
            gameNumber: 1,
            pulls: [{
                red: 3,
                blue: 2,
                green: 20
            },
            {
                red: 9,
                blue: 16,
                green: 18
            },
            {
                red: 19,
                blue: 6,
                green: 10
            },
            {
                red: 12,
                blue: 11,
                green: 19
            }]
        }

        expect(getCubeGameInputsFromLine(input)).toEqual(expectedResult);
        expect(getCubeGameInputsFromLine(multiDigitInput)).toEqual(expectedResultMultiDigit);
        expect(getCubeGameInputsFromLine(puzzleInputLine)).toEqual(expectedPuzzleInputLine);
    });

    test("Given a pull input and a colour, returns the number of cubes for that colour", () => {
        const input = " 3 blue, 4 red, 2 green";
        const expectedRed = 4;
        const expectedBlue = 3;
        const expectedGreen = 2;

        expect(getNumberOfCubesFromPullGivenColour(input, "red")).toEqual(expectedRed);
        expect(getNumberOfCubesFromPullGivenColour(input, "blue")).toEqual(expectedBlue);
        expect(getNumberOfCubesFromPullGivenColour(input, "green")).toEqual(expectedGreen);
    });

    test("Given a puzzle input, return an array of properly formed Cube Game Input objects", () => {
        const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
        const expected: Array<CubeGameInputs> = [
            {
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
            },
            {
                gameNumber: 2,
                pulls: [{
                    red: 0,
                    blue: 1,
                    green: 2
                },
                {
                    red: 1,
                    blue: 4,
                    green: 3
                },
                {
                    red: 0,
                    blue: 1,
                    green: 1
                }]
            }]
        
        expect(getCubeGameArrayFromPuzzleInput(input)).toEqual(expected);
    })
})