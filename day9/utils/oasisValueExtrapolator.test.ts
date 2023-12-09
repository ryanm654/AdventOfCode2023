import * as fs from 'fs';
import { allZeroes, extrapolateNextValueInSequence, findSequenceOfDifferences, parseSequencesFromString, sumExtrapolatedValues } from './oasisValueExtrapolator';

describe("Day 9 Part 1", () => {
    test("Given a sequence, return true if all zeroes", () => {
        const input = [0,0,0,0];

        expect(allZeroes(input)).toEqual(true);
    });
   
    test("Given a sequence, find it's sequence of differences between values", () => {
        const input = [0,3,6,9,12,15];
        const expected = [3,3,3,3,3];

        expect(findSequenceOfDifferences(input)).toEqual(expected);
    });

    test("Given a sequence, extrapolate the next value in the sequence", () => {
        const input = [0,3,6,9,12,15];
        const expected = 18;

        const input2 = [1,3,6,10,15,21];
        const expected2 = 28;

        expect(extrapolateNextValueInSequence(input)).toEqual(expected);
        expect(extrapolateNextValueInSequence(input2)).toEqual(expected2);
    });

    test("Given the test input, extrapolate values and get correct sum", () => {
        const input = [[0,3,6,9,12,15],[1,3,6,10,15,21],[10,13,16,21,30,45]];
        const expected = 114;

        expect(sumExtrapolatedValues(input)).toEqual(expected);
    });

    test("Parse string into array of sequences", () => {
        const input = fs.readFileSync('./day9/testInput', 'utf-8');
        const expected = [[0,3,6,9,12,15],[1,3,6,10,15,21],[10,13,16,21,30,45]];

        expect(parseSequencesFromString(input)).toEqual(expected);
    })
});