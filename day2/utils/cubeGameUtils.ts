import { CubeGameInputs } from "../types/cubeGameTypes";

export const cubeGameIsPossible = (input: CubeGameInputs, maxRed: number, maxBlue: number, maxGreen: number): boolean => {
    let possible: boolean = true;
    
    input.pulls.forEach((pull) => {
        if (pull.red > maxRed || pull.blue > maxBlue || pull.green > maxGreen) possible = false;
    });

    return possible;
}

export const sumPossibleGameIDs = (cubeGameInputs: Array<CubeGameInputs>, maxRed: number, maxBlue: number, maxGreen: number): number => {
    let sumOfPossible = 0;

    cubeGameInputs.forEach((cubeGame) => {
        if (cubeGameIsPossible(cubeGame, maxRed, maxBlue, maxGreen)) sumOfPossible += cubeGame.gameNumber;
    })

    return sumOfPossible;
}

// ----------------------------- Part 2 -------------------------------

export const minimumCubesToPlayPowerValue = (input: CubeGameInputs) => {
    let minRedCubes: number = 0;
    let minBlueCubes: number = 0;
    let minGreenCubes: number = 0;

    input.pulls.forEach((pull) => {
        if ((pull.red != 0) && (minRedCubes == 0 || minRedCubes < pull.red)) minRedCubes = pull.red;
        if ((pull.blue != 0) && (minBlueCubes == 0 || minBlueCubes < pull.blue)) minBlueCubes = pull.blue;
        if ((pull.green != 0) && (minGreenCubes == 0 || minGreenCubes < pull.green)) minGreenCubes = pull.green;
    })

    return minRedCubes * minBlueCubes * minGreenCubes;
}

export const sumPowerValues = (cubeGameInputs: Array<CubeGameInputs>): number => {
    let sumOfPowers: number = 0;

    cubeGameInputs.forEach((cubeGame) => {
        sumOfPowers += minimumCubesToPlayPowerValue(cubeGame)
    })

    return sumOfPowers;
}