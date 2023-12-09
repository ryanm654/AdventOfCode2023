export type SourceDestinationMap = {
    destinationNumber: number;
    sourceNumber: number;
    range: number;
};

export type Almanac = {
    seedNumbers: Array<number>;
    seedRanges?: Array<Array<number>>;
    seedToSoilMap: Array<SourceDestinationMap>;
    soilToFertilizerMap: Array<SourceDestinationMap>;
    fertToWaterMap: Array<SourceDestinationMap>;
    waterToLightMap: Array<SourceDestinationMap>;
    lightToTempMap: Array<SourceDestinationMap>;
    tempToHumidityMap: Array<SourceDestinationMap>;
    humidityToLocationMap: Array<SourceDestinationMap>;
};
