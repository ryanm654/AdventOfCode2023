import { Almanac, SourceDestinationMap } from "../types/Almanac";

export const buildSDMapFromNumbers = (input: Array<Array<number>>): Array<SourceDestinationMap> => {
    let sdArray: Array<SourceDestinationMap> = [];
    
    input.forEach((mapNumbers: Array<number>) => {
        sdArray.push({
            destinationNumber: mapNumbers[0],
            sourceNumber: mapNumbers[1],
            range: mapNumbers[2]
        });
    })

    return sdArray;
};

export const sdNumbersFromString = (numberLines: Array<string>): Array<Array<number>> => {
    let sdNumbers: Array<Array<number>> = [];

    numberLines.forEach((numberString: string) => {
        sdNumbers.push(numberString.split(' ').map((val) => Number(val)));
    })

    return sdNumbers;
};

export const seedsFromString = (seedsLine: string): Array<number> => {
    const split: Array<string> = seedsLine.split(':');
    const numbers: Array<string> = split[1].split(' ').filter((val) => val != '');

    return numbers.map((val) => Number(val));
};

export const buildAlamanacFromPuzzleInput = (input: string): Almanac => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const stringSplits: Array<string> = sanitisedString.split('\n');

    let seeds: Array<number> = [];
    let sdNumbers: Array<Array<string>> = [];
    let tempSdNumbers: Array<string> = [];

    stringSplits.forEach((string, index) => {
        if (index == 0) {
            seeds = seedsFromString(string);
        }
        else if (string == '' && tempSdNumbers.length != 0) {
            sdNumbers.push([...tempSdNumbers]);
            tempSdNumbers = [];
        }
        else if (index != 1) {
            tempSdNumbers.push(string);
        }
    })

    return {
        seedNumbers: seeds,
        seedToSoilMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[0].slice(1))),
        soilToFertilizerMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[1].slice(1))),
        fertToWaterMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[2].slice(1))),
        waterToLightMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[3].slice(1))),
        lightToTempMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[4].slice(1))),
        tempToHumidityMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[5].slice(1))),
        humidityToLocationMap: buildSDMapFromNumbers(sdNumbersFromString(sdNumbers[6].slice(1)))
    }
};