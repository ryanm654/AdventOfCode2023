const numberWordsMap = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', ];

export const checkForNumberWord = (line: string, index: number): number | null => {
    let digit: number | null = null;

    numberWordsMap.forEach((word, i) => {
        if (line.indexOf(word, index) == index) digit = i;
    })
    
    return digit;
}

export const recoverTwoDigitNumberFromLine = (line: string) => {
    let firstDigit: string | null = null;
    let lastDigit: string | null = null;
    
    const chars = [...line];
    chars.forEach((c: string | null, i) => {
        if (c != null) {
            if (c >= '0' && c <= '9') {
                if (firstDigit == null) firstDigit = c;
                lastDigit = c;
            }
            let numberWord: number | null  = null
            switch(c) {
                case 'o': numberWord = checkForNumberWord(line, i);
                case 't': numberWord = checkForNumberWord(line, i);
                case 'f': numberWord = checkForNumberWord(line, i);
                case 's': numberWord = checkForNumberWord(line, i);
                case 'e': numberWord = checkForNumberWord(line, i);
                case 'n': numberWord = checkForNumberWord(line, i);
                case 'z': numberWord = checkForNumberWord(line, i);
                default: break;
            }
            if (numberWord != null) {
                if (firstDigit == null) firstDigit = String(numberWord);
                lastDigit = String(numberWord);
            }
        }
    });

    if (firstDigit == null) firstDigit = '0';
    if (lastDigit == null) lastDigit = null;

    return parseInt(firstDigit + lastDigit);
}

export const recoverCalibrationFromText = (text: String) => {
    let lineArray: Array<string> = text.split('\n');
    let sumTotal: number = 0;

    lineArray.forEach((line => {
        sumTotal += recoverTwoDigitNumberFromLine(line);
    }))

    return sumTotal;
}