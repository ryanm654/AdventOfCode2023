

export const parseInputIntoTimeDistanceArray = (input: string): Array<Array<number>> => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const timeDistanceSplit: Array<string> = sanitisedString.split('\n');
    let timeDistanceArray: Array<Array<number>> = [];

    const times = timeDistanceSplit[0].split(' ')
        .filter((val) => val.match(/\d+/))
        .map(Number);
    
    const distances = timeDistanceSplit[1].split(' ')
        .filter((val) => val.match(/\d+/))
        .map(Number);

    times.forEach((time, index) => {
        timeDistanceArray.push([time, distances[index]]);
    })

    return timeDistanceArray;
}

export const calculateDistance = (buttonHoldTime: number, totalRaceTime: number): number => {
    return buttonHoldTime * (totalRaceTime - buttonHoldTime);
}

export const findNumberOfWaysToBeatRecord = (time: number, recordDistance: number): number => {
    let recordBeatenCount: number = 0;

    for (let i = 0; i <= time; i++) {
        if (calculateDistance(i, time) > recordDistance) {
            recordBeatenCount++;
        }
    }

    return recordBeatenCount;
}

export const multiplyNumberOfWaysToBeatRecordPerRace = (input: Array<Array<number>>): number => {
    let multipliedWays = 1;
    
    input.forEach((timeDistanceArray) => {
        multipliedWays *= findNumberOfWaysToBeatRecord(timeDistanceArray[0], timeDistanceArray[1]);
    });

    return multipliedWays;
}