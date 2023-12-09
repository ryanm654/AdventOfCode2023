export type ScratchCardDetails = {
    cardNumber: number;
    winningNumbers: Array<number>;
    pulledNumbers: Array<number>;
}

export const parseCardStringIntoCardDetails = (line: string): ScratchCardDetails => {
    const stringSplit: Array<string> = line.split(':');
    const cardNumber: number = Number(stringSplit[0].match(/\d+/));
    const numbersSplit: Array<string> = stringSplit[1].split('|');
    const winningNumbers: Array<number> = numbersSplit[0].split(' ').filter((val) => val != '').map(Number);
    const pulledNumbers: Array<number> = numbersSplit[1].split(' ').filter((val) => val != '').map(Number);

    return {
        cardNumber,
        winningNumbers,
        pulledNumbers
    };
};

export const returnSubsetOfPulledWinningNumbers = (winningNumbers: Array<number>, pulledNumbers: Array<number>): Array<number> => {
    return winningNumbers.filter((number) => pulledNumbers.indexOf(number) > -1);
};

export const winningNumbersToPointValue = (numbers: Array<number>): number => {
    if (numbers.length == 0) return 0;
    return 2**(numbers.length - 1); 
}

export const sumPointsFromListOfCards = (input: string): number => {
    const sanitisedInput: string = input.replace(/\r/g, '');
    const lines: Array<string> = sanitisedInput.split('\n');
    let sumOfPoints: number = 0;

    lines.forEach((line) => {
        const cardDetails: ScratchCardDetails = parseCardStringIntoCardDetails(line);
        const winningNumbers: Array<number> = returnSubsetOfPulledWinningNumbers(cardDetails.winningNumbers, cardDetails.pulledNumbers);
        sumOfPoints += winningNumbersToPointValue(winningNumbers);
    });

    return sumOfPoints;
}

// Part 2

export const findTotalCopiesOfScratchCards = (input: string): number => {
    const sanitisedInput: string = input.replace(/\r/g, '');
    const lines: Array<string> = sanitisedInput.split('\n');
    let totalScratchCards: number = 0;
    let scratchCardMap: Map<number, number> = new Map();

    lines.forEach((line) => {
        totalScratchCards += 1;
        const cardDetails: ScratchCardDetails = parseCardStringIntoCardDetails(line);
        const winningNumbers: Array<number> = returnSubsetOfPulledWinningNumbers(cardDetails.winningNumbers, cardDetails.pulledNumbers);

        const numberOfCopiesOfCurrentCard: number = scratchCardMap.get(cardDetails.cardNumber) || 0;
        totalScratchCards += numberOfCopiesOfCurrentCard;

        for (let i = 1; i <= winningNumbers.length; i++) {
            scratchCardMap.set(cardDetails.cardNumber + i, (scratchCardMap.get(cardDetails.cardNumber + i) || 0) + (1 + numberOfCopiesOfCurrentCard))
        }
    })

    return totalScratchCards;
}