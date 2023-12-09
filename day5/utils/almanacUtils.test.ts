import * as fs from 'fs';
import { buildAlamanacFromPuzzleInput, buildSDMapFromNumbers, sdNumbersFromString, seedsFromString } from './almanacBuilderUtils';
import { Almanac, SourceDestinationMap } from '../types/Almanac';
import { findLocationGivenSeed, mapSourceToDestination, findLowestLocationGivenAlmanac, findLowestLocationGivenAlmanacWithSeedRanges } from './almanacTraversalUtils';

const seedToSoilMap = [{
    destinationNumber: 50,
    sourceNumber: 98,
    range: 2,
},
{
    destinationNumber: 52,
    sourceNumber: 50,
    range: 48,
}];
const soilToFertMap = [{
    destinationNumber: 0,
    sourceNumber: 15,
    range: 37,
},
{
    destinationNumber: 37,
    sourceNumber: 52,
    range: 2,
},
{
    destinationNumber: 39,
    sourceNumber: 0,
    range: 15,
}];
const fertToWaterMap = [{
    destinationNumber: 49,
    sourceNumber: 53,
    range: 8,
},
{
    destinationNumber: 0,
    sourceNumber: 11,
    range: 42,
},
{
    destinationNumber: 42,
    sourceNumber: 0,
    range: 7,
},
{
    destinationNumber: 57,
    sourceNumber: 7,
    range: 4,
}];
const waterToLightMap = [{
    destinationNumber: 88,
    sourceNumber: 18,
    range: 7,
},
{
    destinationNumber: 18,
    sourceNumber: 25,
    range: 70,
}];
const lightToTempMap = [{
    destinationNumber: 45,
    sourceNumber: 77,
    range: 23,
},
{
    destinationNumber: 81,
    sourceNumber: 45,
    range: 19,
},
{
    destinationNumber: 68,
    sourceNumber: 64,
    range: 13
}];
const tempToHumidityMap = [{
    destinationNumber: 0,
    sourceNumber: 69,
    range: 1,
},
{
    destinationNumber: 1,
    sourceNumber: 0,
    range: 69,
}];
const humidityToLocationMap = [{
    destinationNumber: 60,
    sourceNumber: 56,
    range: 37,
},
{
    destinationNumber: 56,
    sourceNumber: 93,
    range: 4,
}];

const almanac: Almanac = {
    seedNumbers: [79, 14, 55, 13],
    seedToSoilMap: seedToSoilMap,
    soilToFertilizerMap: soilToFertMap,
    fertToWaterMap: fertToWaterMap,
    waterToLightMap: waterToLightMap,
    lightToTempMap: lightToTempMap,
    tempToHumidityMap: tempToHumidityMap,
    humidityToLocationMap: humidityToLocationMap
};


describe("Almanac creator utilities", () => {
    test("Given an input string, build an almanac object", () => {
        const input = fs.readFileSync('./day5/testInput', 'utf-8');
        const expected = almanac;

        expect(buildAlamanacFromPuzzleInput(input)).toEqual(expected);
    });
});

describe("Map creator utilities", () => {
    test("Given an array of string of map numbers, convert into array of sets of numbers", () => {
        const input = ["50 98 2", "52 50 48"];
        const expected = [[50, 98, 2], [52, 50, 48]];

        expect(sdNumbersFromString(input)).toEqual(expected);
    });

    test("Given an array of sets of numbers, build a SourceDestinationMap", () => {
        const input = [[50, 98, 2], [52, 50, 48]];
        const expected = seedToSoilMap;

        expect(buildSDMapFromNumbers(input)).toEqual(expected);
    });

    test("Given a string of seeds, return an array of number seeds", () => {
        const input = "seeds: 79 14 55 13";
        const expected = [79, 14, 55, 13];

        expect(seedsFromString(input)).toEqual(expected);
    });
});

describe("Almanac traversal utilities", () => {
    test("Given almanac and seed number, find location number", () => {
        const inputSeed = 79;
        const expected = 82;

        expect(findLocationGivenSeed(almanac, inputSeed)).toEqual(expected);
    })

    test("Given map and source, find the correct destination", () => {
        const source = 79;
        const destination = 81;

        expect(mapSourceToDestination(source, seedToSoilMap)).toEqual(destination);
    });

    test("Given map and source, find the correct destination", () => {
        const source = 81;
        const destination = 81;

        expect(mapSourceToDestination(source, soilToFertMap)).toEqual(destination);
    });
});

describe("Day 5 Puzzle 1", () => {
    test("Given puzzle input, the lowest location should be 35", () => {
        const input = fs.readFileSync('./day5/testInput', 'utf-8');
        const alm = buildAlamanacFromPuzzleInput(input);
        const expected = 35;

        expect(findLowestLocationGivenAlmanac(alm)).toEqual(expected);
    });
});

describe("Day 5 Puzzle 2", () => {
    test("Given puzzle input, the lowest location should be 46", () => {
        const input = fs.readFileSync('./day5/testInput', 'utf-8');
        const alm = buildAlamanacFromPuzzleInput(input);
        const expected = 46;

        expect(findLowestLocationGivenAlmanacWithSeedRanges(alm)).toEqual(expected);
    });
});

