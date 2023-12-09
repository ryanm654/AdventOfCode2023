import * as fs from 'fs';
import { findAndSumEnginePartNumbers, validateIfPartNumber, scanLineForSymbol, findAndSumGearRatios } from "./EnginePartFinder";
import exp from 'constants';

describe("Engine Part Finder utility functions", () => {
    describe("scanLineForSymbol", () => {
        test("scanLineForSymbol returns true if a symbol that is not . or a number is found", () => {
            const input = "...*......";
            const xIndex = 0;
            const scanSize = 5;

            expect(scanLineForSymbol(input, xIndex, 3, scanSize, 111)).toBeTruthy();
        });

        test("scanLineForSymbol returns false if no symbol that is not . or a number is found", () => {
            const input = "..35..633.";
            const xIndex = 0;
            const scanSize = 8;

            expect(scanLineForSymbol(input, xIndex, 3, scanSize, 111)).toBeFalsy();
        })

        test("scanLineForSymbol does not break if end of line reached with false output", () => {
            const input = "..........";
            const xIndex = 7;
            const scanSize = 5;

            expect(scanLineForSymbol(input, xIndex, 3, scanSize, 111)).toBeFalsy();
        })

        test("scanLineForSymbol does not break if end of line reached with true output", () => {
            const input = ".........*";
            const xIndex = 7;
            const scanSize = 5;

            expect(scanLineForSymbol(input, xIndex, 3, scanSize, 111)).toBeTruthy();
        })

        test("scanLineForSymbol does not break on negative index", () => {
            const input = ".........*";
            const xIndex = -1;
            const scanSize = 5;

            expect(scanLineForSymbol(input, xIndex, 3, scanSize, 111)).toBeFalsy();
        })
    });
    
    describe("validateIfPartNumber", () => {
        test("If partNumber (467) is surrounded by a symbol then return true", () => {
            const input = [ '467..114..', 
                            '...*......', 
                            '..35..633.'];

            const xIndex = 0;
            const yIndex = 0;
            const scanSize = 5;

            expect(validateIfPartNumber(467, input, xIndex, yIndex, scanSize)).toBeTruthy();
        });

        test("If partNumber (633) is not surrounded by a symbol then return false", () => {
            const input = [ '467..114..', 
                            '...*......', 
                            '..35..633.'];

            const xIndex = 6;
            const yIndex = 2;
            const scanSize = 5;

            expect(validateIfPartNumber(633, input, xIndex, yIndex, scanSize)).toBeFalsy();
        });
    });

    describe("findAndSumEnginePartNumbers", () => {
        test("Given test input, output should be 4361", () => {
            const input = fs.readFileSync("./day3/testInput", 'utf-8');
            const expected = 4361

            expect(findAndSumEnginePartNumbers(input)).toEqual(expected);
        });

        test("Given input with repeating numbers, should still work", () => {
            const input = "...123*......123....123*....123.....123&\n.............";
            const expected = 369;

            expect(findAndSumEnginePartNumbers(input)).toEqual(expected);
        });

        test("reddit test case", () => {
            const input = "........\n.24..4..\n......*."
            const expected = 4;

            expect(findAndSumEnginePartNumbers(input)).toEqual(expected);
        })
    })

    describe("findAndSumGearRatios", () => {
        test("Given test input, output should be 467835", () => {
            const input = fs.readFileSync("./day3/testInput", 'utf-8');
            const expected = 467835;

            expect(findAndSumGearRatios(input)).toEqual(expected);
        })
    });
})