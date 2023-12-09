import { Almanac, SourceDestinationMap } from "../types/Almanac";

export const mapSourceToDestination = (source: number, mapArray: Array<SourceDestinationMap>): number => {
    let dest = source;
    
    mapArray.forEach((map) => {
        if (source >= map.sourceNumber && source < (map.sourceNumber + map.range)) {
            dest = source + (map.destinationNumber - map.sourceNumber);
        }
    });

    return dest;
}

export const findLocationGivenSeed = (almanac: Almanac, seed: number) => {
    let source = seed;
    source = mapSourceToDestination(source, almanac.seedToSoilMap);
    source = mapSourceToDestination(source, almanac.soilToFertilizerMap);
    source = mapSourceToDestination(source, almanac.fertToWaterMap);
    source = mapSourceToDestination(source, almanac.waterToLightMap);
    source = mapSourceToDestination(source, almanac.lightToTempMap);
    source = mapSourceToDestination(source, almanac.tempToHumidityMap);
    source = mapSourceToDestination(source, almanac.humidityToLocationMap);
    
    return source;
}

export const findLowestLocationGivenAlmanac = (almanac: Almanac): number => {
    let lowest: number = -1;
    
    almanac.seedNumbers.forEach((seed) => {
        const location = findLocationGivenSeed(almanac, seed);
        if (lowest == -1 || location < lowest) {
            lowest = location;
        }
    })
    
    return lowest;
}

// Part 2
export const findLowestLocationGivenAlmanacWithSeedRanges = (almanac: Almanac): number => {
    let lowest: number = -1;

    for (let i = 0; i < almanac.seedNumbers.length; i += 2) {
        console.log("Running seed number " + i + ": Source beginning at " + almanac.seedNumbers[i] + " with range " + almanac.seedNumbers[i+1]);
        for (let currentSeed = almanac.seedNumbers[i]; 
            currentSeed < (almanac.seedNumbers[i] + almanac.seedNumbers[i+1]);
            currentSeed++) {
                const location = findLocationGivenSeed(almanac, currentSeed);
                if (lowest == -1 || location < lowest) {
                    lowest = location;
                }
            }
    }

    return lowest;
}