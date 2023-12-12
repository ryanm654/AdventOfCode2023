import { PipeArray, CoOrdinate, PipeConnectionDetails } from "./Types";

export const buildArray = (input: string): PipeArray => {
    return input.split('\n').map((val) => [...val]);
}

export const pipeConnectsEast = (pipe: string): boolean => { 
    return (pipe == 'S' || pipe == '-' || pipe == 'L' || pipe == 'F');
}

export const pipeConnectsWest = (pipe: string): boolean => { 
    return (pipe == 'S' || pipe == '-' || pipe == 'J' || pipe == '7');
}

export const pipeConnectsNorth = (pipe: string): boolean => { 
    return (pipe == 'S' || pipe == '|' || pipe == 'L' || pipe == 'J');
}

export const pipeConnectsSouth = (pipe: string): boolean => { 
    return (pipe == 'S' || pipe == '|' || pipe == 'F' || pipe == '7');
}

export const findConnectingPipes = (pipeArray: PipeArray, xy: CoOrdinate): Array<CoOrdinate> => {
    let foundConnections: Array<CoOrdinate> = [];
    const x: number  = xy[0];
    const y: number = xy[1];
    const pipe: string = pipeArray[y][x];
    
    if (pipeConnectsWest(pipe) && x - 1 >= 0) {
        if (pipeConnectsEast(pipeArray[y][x-1])) foundConnections.push([x-1,y]);
    }
    if (pipeConnectsEast(pipe) && x + 1 < pipeArray[y].length) {
        if (pipeConnectsWest(pipeArray[y][x+1])) foundConnections.push([x+1,y]);
    }
    if (pipeConnectsNorth(pipe) && y - 1 >= 0) {
        if (pipeConnectsSouth(pipeArray[y-1][x])) foundConnections.push([x,y-1]);
    }
    if (pipeConnectsSouth(pipe) && y + 1 < pipeArray.length) {
        if (pipeConnectsNorth(pipeArray[y+1][x])) foundConnections.push([x,y+1]);
    }

    return foundConnections;
}

export const findS = (pipeArray: PipeArray): CoOrdinate => {
    let indexOfS: CoOrdinate = [];
    
    pipeArray.forEach((line, index) => {
        if (line.indexOf('S') != -1) {
            indexOfS = [line.indexOf('S'), index];
        }
    })

    return indexOfS;
}

export const alreadyInConnections = (connections: Array<CoOrdinate>, xy: CoOrdinate): boolean => {
    const result = connections.filter((item) => {
        if (item.length = xy.length) {
            for (let i = 0; i < item.length; i++) {
                if (item[i] !== xy[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    })
    
    return result.length > 0;
}

export const generatePipeDetails = (pipeArray: PipeArray): PipeConnectionDetails => {
    const distanceArray: Array<Array<number>> = new Array(pipeArray.length)
                                                    .fill(-1)
                                                    .map(() => {
                                                        return new Array(pipeArray[0].length).fill(-1)
                                                    });

    let distance: number = 0;
    let xyIndex: CoOrdinate = findS(pipeArray);
    distanceArray[xyIndex[1]][xyIndex[0]] = distance;
    const foundConnections: Array<CoOrdinate> = [xyIndex];
    
    let loopIndex: number = 0;

    while (foundConnections[loopIndex] != undefined) {
        distance = Math.ceil((loopIndex) / 2);
        const xy = foundConnections[loopIndex];
        distanceArray[xy[1]][xy[0]] = distance;
        const newConnections: Array<CoOrdinate> = findConnectingPipes(pipeArray, xy);

        newConnections.forEach((connection: CoOrdinate) => {
            if (!alreadyInConnections(foundConnections, connection)) foundConnections.push(connection);
        })

        loopIndex++;
    }

    return {
        distanceArray,
        foundConnections
    };
}

export const findFurthestStepsFromStart = (input: string): number => {
    const sanitisedString = input.replace(/\r/g, '');
    const pipeArray: PipeArray = buildArray(sanitisedString);
    const distanceArray = generatePipeDetails(pipeArray).distanceArray;    

    let max: number = -1;

    distanceArray.forEach((line) => {
        const maxInLine: number = Math.max.apply(null, line);
        if (maxInLine > max) max = maxInLine;
    })

    return max;
};

export const pipeIsVerticalCorner = (wall: string): boolean => {
    return wall == 'F' || wall == 'L';
}

export const countTilesEnclosedByLoop = (input: string): number => {
    const sanitisedString = input.replace(/\r/g, '');
    const pipeArray: PipeArray = buildArray(sanitisedString);
    const pipeDetails: PipeConnectionDetails = generatePipeDetails(pipeArray); 
    const distanceArray = pipeDetails.distanceArray;
    const foundConnections = pipeDetails.foundConnections;

    let count = 0;

    distanceArray.forEach((line: Array<number>, yIndex) => {
        let insideLoop = false;
        let wallStartValue = '';

        line.forEach((value: number, index) => {
            if (index != 0 && index != line.length - 1) {
                if (value != -1) {
                    const wall = pipeArray[yIndex][index];
                    if (wall == '|' || wall == 'S') {
                        insideLoop = !insideLoop;
                    }
                    else if ((wall == 'F' || wall == 'L')) {
                        wallStartValue = wall;
                    }
                    else if (wallStartValue != '' && (wall == '7' || wall == 'J')) {
                        switch(wallStartValue) {
                            case 'F': {
                                if (wall == 'J') {
                                    insideLoop = !insideLoop;
                                }
                                wallStartValue = '';
                                break;
                            }
                            case 'L': {
                                if (wall == '7') {
                                    insideLoop = !insideLoop;
                                }
                                wallStartValue = '';
                                break;
                            }
                            default: break;
                        }
                    }
                }
                if (value == -1 && insideLoop) {
                    count++;
                    wallStartValue == '';
                }
            }
        });
    });

    return count;
}