export const findSequenceOfDifferences = (sequence: Array<number>): Array<number> => {
    let sequenceOfDiff: Array<number> = [];

    for (let i = 1; i < sequence.length; i++) {
        sequenceOfDiff.push(sequence[i] - sequence[i-1]);
    }

    return sequenceOfDiff;
};

export const allZeroes = (sequence: Array<number>): boolean => {
    return sequence.filter((val) => val != 0).length == 0;
};

export const extrapolateNextValueInSequence = (sequence: Array<number>): number => {
    let sequenceOfDiffs: Array<Array<number>> = [sequence];
    let index: number = 0;

    while (!allZeroes(sequenceOfDiffs[index])) {
        sequenceOfDiffs.push(findSequenceOfDifferences(sequenceOfDiffs[index]))
        index++;
    }

    sequenceOfDiffs[index].push(0);
    index--;

    for (index; index >= 0; index--) {
        const arrayIndexToAddValueFrom: number = sequenceOfDiffs[index].length - 1;
        sequenceOfDiffs[index].push(sequenceOfDiffs[index][arrayIndexToAddValueFrom] 
            + sequenceOfDiffs[index + 1][arrayIndexToAddValueFrom]);
    }

    return sequenceOfDiffs[0][sequenceOfDiffs[0].length - 1];
};


export const sumExtrapolatedValues = (sequences: Array<Array<number>>): number => {
    let sum = 0;

    sequences.forEach((sequence: Array<number>) => {
        sum += extrapolateNextValueInSequence(sequence);
    })

    return sum;
};

export const parseSequencesFromString = (input: string): Array<Array<number>> => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const sequences: Array<string> = sanitisedString.split('\n');
    const numberSequences: Array<Array<number>> = sequences.map((stringSeq) => {
        return stringSeq.split(' ').map(Number);
    });
    
    return numberSequences;
}