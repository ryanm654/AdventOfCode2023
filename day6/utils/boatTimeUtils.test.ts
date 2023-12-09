import * as fs from 'fs';
import { calculateDistance, findNumberOfWaysToBeatRecord, multiplyNumberOfWaysToBeatRecordPerRace, parseInputIntoTimeDistanceArray } from './boatTimeUtils';

describe("String parsing utils", () => {
    test("Given puzzle input, return array of time+distance values", () => {
        const input = fs.readFileSync('./day6/testInput', 'utf-8'); 
        const expected = [[7,9],[15,40],[30,200]];

        expect(parseInputIntoTimeDistanceArray(input)).toEqual(expected);
    })
});

describe("Boat race utils", () => {
    test("Given a race of 7 seconds and record distance 9, 4 ways to win", () => {
        const inputTime = 7;
        const inputRecord = 9;
        const expected = 4;

        expect(findNumberOfWaysToBeatRecord(inputTime, inputRecord)).toEqual(expected);
    });

    test("Given a button hold time of 1ms and 7 total race ms, expect a distance travelled of 6mm", () => {
        const inputButtonHold = 1;
        const totalRaceTime = 7;
        const expected = 6;

        expect(calculateDistance(inputButtonHold, totalRaceTime)).toEqual(expected);
    })

    test("Given a button hold time of 1ms and 7 total race ms, expect a distance travelled of 6mm", () => {
        const inputButtonHold = 3;
        const totalRaceTime = 7;
        const expected = 12;

        expect(calculateDistance(inputButtonHold, totalRaceTime)).toEqual(expected);
    })
});

describe("Day 1 Puzzle 1", () => {
    test("Given puzzle input, answer should be 288", () => {
        const input = [[7,9],[15,40],[30,200]];
        const expected = 288;

        expect(multiplyNumberOfWaysToBeatRecordPerRace(input)).toEqual(expected);
    });
})

