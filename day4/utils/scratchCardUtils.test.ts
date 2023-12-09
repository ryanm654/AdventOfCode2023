import * as fs from 'fs';
import { ScratchCardDetails, findTotalCopiesOfScratchCards, parseCardStringIntoCardDetails, returnSubsetOfPulledWinningNumbers, sumPointsFromListOfCards, winningNumbersToPointValue } from "./scratchCardUtils";
import exp from 'constants';

describe("Day 4 Puzzle 1: Scratch card winning numbers", () => {
    test("Given a set of scratch cards with winning numbers and pulled numbers, the point value of each scratch card should be summed", () => {
        const input = fs.readFileSync('./day4/testInput', 'utf-8');
        const expected = 13;

        expect(sumPointsFromListOfCards(input)).toEqual(expected);
    });

    test("Given an array of winning numbers and an array of pulled numbers, return the subset of pulled winning numbers", () => {
        const winningNumbers = [41, 48, 83, 86, 17];
        const pulledNumbers = [83, 86, 6, 31, 17, 9, 48, 53];
        const expected = [48, 83, 86, 17];

        expect(returnSubsetOfPulledWinningNumbers(winningNumbers, pulledNumbers)).toEqual(expected);
    });

    test("No winning numbers returns empty array", () => {
        const winningNumbers = [87, 83, 26, 28, 32];
        const pulledNumbers = [88, 30, 70, 12, 93, 22, 82, 36];
        const expected = [];

        expect(returnSubsetOfPulledWinningNumbers(winningNumbers, pulledNumbers)).toEqual(expected);
    });

    test("Given a string with 'card x: [win] | [pull]', return an object with card number, winning numbers array and pulled numbers array", () => {
        const input: string = "Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
        const expected: ScratchCardDetails = {
            cardNumber: 1,
            winningNumbers: [41, 48, 83, 86, 17],
            pulledNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
        };

        expect(parseCardStringIntoCardDetails(input)).toEqual(expected);
    })

    test("Array sizes should map properly to point value", () => {
        const zeroPoints = [];
        const onePoint = [1];
        const twoPoints = [1, 2];
        const fourPoints = [1,2,3];
        const eightPoints = [1,2,3,4];
        const sixteenPoints = [1,2,3,4,5];

        expect(winningNumbersToPointValue(zeroPoints)).toEqual(0);
        expect(winningNumbersToPointValue(onePoint)).toEqual(1);
        expect(winningNumbersToPointValue(twoPoints)).toEqual(2);
        expect(winningNumbersToPointValue(fourPoints)).toEqual(4);
        expect(winningNumbersToPointValue(eightPoints)).toEqual(8);
        expect(winningNumbersToPointValue(sixteenPoints)).toEqual(16);
    })
})

describe("Day 4 Puzzle 2: Scratch cards win more scratch cards", () => {
    test("Given list of scratch cards, should run through all originals and copies and tally total number of cards", () => {
        const input = fs.readFileSync('./day4/testInput', 'utf-8');
        const expected = 30;

        expect(findTotalCopiesOfScratchCards(input)).toEqual(expected);
    })
})