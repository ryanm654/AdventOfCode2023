import { CubeGameInputs, Pulls } from "../types/cubeGameTypes";

export const getNumberOfCubesFromPullGivenColour = (pull: string, colour: string): number => {
    const colourSplit: Array<string> = pull.split(',');
    let cubeCount: number = 0;

    colourSplit.forEach((cubeString) => {
        const cubeSplit: Array<string> = cubeString.split(' ');
        if (cubeSplit[2] == colour) {
            cubeCount = parseInt(cubeSplit[1]);
        }
    })
    return cubeCount;
}

export const getCubeGameInputsFromLine = (line: string): CubeGameInputs => {
    const gameAndPullsSplit: Array<string> = line.split(':');
    const gameString: string = gameAndPullsSplit[0];
    const pullsStringArray: Array<string> = gameAndPullsSplit[1].split(';');
    let pullsArray: Array<Pulls> = [];
    
    pullsStringArray.forEach((pull) => {
        pullsArray.push({
            red: getNumberOfCubesFromPullGivenColour(pull, "red"),
            blue: getNumberOfCubesFromPullGivenColour(pull, "blue"),
            green: getNumberOfCubesFromPullGivenColour(pull, "green"),
        })
    })

    return {
        gameNumber: parseInt(gameString.split(' ')[1]),
        pulls: pullsArray
    };
}

export const getCubeGameArrayFromPuzzleInput = (puzzleInput: string): Array<CubeGameInputs> => {
    const sanitisedPuzzleInput = puzzleInput.replace(/\r/g, '');
    const gameLines = sanitisedPuzzleInput.split('\n');
    let cubeGameArray: Array<CubeGameInputs> = [];

    gameLines.forEach((line) => {
        cubeGameArray.push(getCubeGameInputsFromLine(line));
    })

    return cubeGameArray;
};