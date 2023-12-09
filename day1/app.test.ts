import { recoverTwoDigitNumberFromLine, recoverCalibrationFromText, checkForNumberWord } from "./calibrationUtils";

describe("Day 1 Puzzle 1", () => {
    test("Given a line with 'two' in it and the correct index value, number word method should return 2", () => {
        const testString = "two1nine";
        const expected = 2;

        expect(checkForNumberWord(testString, 0)).toEqual(expected);
    })

    test("Given a line with 'nine' in it and the correct index value, number word method should return 9", () => {
        const testString = "two1nine";
        const expected = 9;

        expect(checkForNumberWord(testString, 4)).toEqual(expected);
    })

    test("Given a line with 'nine' in it and the incorrect index value, number word method should return null", () => {
        const testString = "two1nine";
        const expected = null;

        expect(checkForNumberWord(testString, 5)).toEqual(expected);
    })
    
    test("Given a line with multiple digits, extract the first digit and last digit from them and return as a two digit number", () => {
        const testString = "a1b2c3d4e5f";
        const expected = 15;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line with one digit, treat single number as first and last digit and return as a two digit number", () => {
        const testString = "treb7uchet";
        const expected = 77;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line with digits written as words, consider the word numbers to be valid digits and use them in the calculation too", () => {
        const testString = "two1nine";
        const expected = 29;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line with digits written as words, consider the word numbers to be valid digits and use them in the calculation too", () => {
        const testString = "eightwothree";
        const expected = 83;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line 'two1', the digit should be 21", () => {
        const testString = "two1";
        const expected = 21;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line 'seveneightseven', the digit should be 77", () => {
        const testString = "seveneightseven";
        const expected = 77;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })

    test("Given a line 'eighthree', the digit should be 83", () => {
        const testString = "eighthree";
        const expected = 83;

        expect(recoverTwoDigitNumberFromLine(testString)).toEqual(expected);
    })
    
    test("Given a text block of multiple lines, first and last digits should be extracted, combined to a two digit number, then summed", () => {
        const testString = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
        const expected = 142

        expect(recoverCalibrationFromText(testString)).toEqual(expected)
    })

    test("Given a text block of multiple lines with word numbers, first and last digits should be extracted, combined to a two digit number, then summed", () => {
        const testString = "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";
        const expected = 281

        expect(recoverCalibrationFromText(testString)).toEqual(expected)
    })
})
