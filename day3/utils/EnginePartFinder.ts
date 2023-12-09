const gearMap: Map<string, Array<number>> = new Map<string, Array<number>>();

export const scanLineForSymbol = (line: string, xIndex: number, yIndex: number, scanSize: number, num: number): boolean => {
    const chars: Array<string> = [...line];
    let symbolFound: boolean = false;

    for (let i = 0; i < scanSize; i++) {
        const index = xIndex + i;
        if ((index) < line.length && (index >= 0)) {
            const charToCheck = chars[index];
            if (charToCheck != '.' && isNaN(Number(charToCheck))) {
                symbolFound = true;
                // part 2
                if (charToCheck == '*') {
                    const gearMapEntry = gearMap.get('' + index + ',' + yIndex);
                    if (gearMapEntry != undefined) {
                        gearMapEntry.push(num);
                    }
                    else {
                        gearMap.set('' + index + ',' + yIndex, [num]);
                    }
                }
            }
        }
    }
    
    return symbolFound;
}

export const validateIfPartNumber = (num: number,
                                    lines: Array<string>,  
                                    xIndex: number, 
                                    yIndex: number,
                                    scanSize: number): boolean => {
    let partNumberConfirmed: boolean = false;

    if (yIndex - 1 >= 0) {
        if (scanLineForSymbol(lines[yIndex - 1], xIndex - 1, yIndex - 1, scanSize, num)) { partNumberConfirmed = true; }
    }
    if (scanLineForSymbol(lines[yIndex], xIndex - 1, yIndex, scanSize, num)) { partNumberConfirmed = true; }
    if (yIndex + 1 < lines.length) {
        if (scanLineForSymbol(lines[yIndex + 1], xIndex - 1, yIndex + 1, scanSize, num)) { partNumberConfirmed = true; }
    }

    return partNumberConfirmed;
};

export const findAndSumEnginePartNumbers = (input: string): number => {
    let sumOfPartNumbers: number = 0;
    const sanitInput = input.replace(/\r/g, '');
    const lines = sanitInput.split('\n');

    lines.forEach((line: string, yIndex: number) => {
        const numbersArray = line.split(/\D/).filter((value) => value != '');
        let indexBuffer = 0;
        numbersArray.forEach((number) => {
            let xIndex: number | null = null;

            xIndex = line.indexOf(number);
            line = line.substring(xIndex + number.length, line.length)
            xIndex = xIndex + indexBuffer;
            indexBuffer = xIndex + number.length;
            
            const scanSize = number.length + 2;

            if (validateIfPartNumber(parseInt(number), lines, xIndex, yIndex, scanSize)) {
                sumOfPartNumbers += parseInt(number);
            }
        })
    })

    return sumOfPartNumbers;
};

// --------------------- PART 2 ----------------------

export const findAndSumGearRatios = (input: string): number => {
    gearMap.clear();
    let sumOfGearRatios: number = 0;
    const sanitInput = input.replace(/\r/g, '');
    const lines = sanitInput.split('\n');

    lines.forEach((line: string, yIndex: number) => {
        const numbersArray = line.split(/\D/).filter((value) => value != '');
        let indexBuffer = 0;
        numbersArray.forEach((number) => {
            let xIndex: number | null = null;

            xIndex = line.indexOf(number);
            line = line.substring(xIndex + number.length, line.length)
            xIndex = xIndex + indexBuffer;
            indexBuffer = xIndex + number.length;
            
            const scanSize = number.length + 2;

            validateIfPartNumber(parseInt(number), lines, xIndex, yIndex, scanSize);
        })
    });

    for (let [key, value] of gearMap) {
        if (value.length == 2) {
            const gearRatio = value[0] * value[1];
            sumOfGearRatios += gearRatio;
        }
    }

    return sumOfGearRatios;
}