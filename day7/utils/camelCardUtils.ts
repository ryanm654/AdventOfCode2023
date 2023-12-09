import { CamelCardHand } from "./CamelCardHand";

export type CCHandData = {
    hand: string;
    cardClass: CamelCardHand;
    bid: number;
}

export const classifyHand = (hand: string): CamelCardHand => {
    let foundPairCard: string = '';
    let handClassification = CamelCardHand.HIGH_CARD;

    const cards: Array<string> = [...hand];
    
    cards.forEach((card: string) => {
        if (cards.filter((val) => val == card).length == 2) {
            switch(handClassification) {
                case CamelCardHand.FULL_HOUSE: break;
                case CamelCardHand.THREE_OF_A_KIND: handClassification = CamelCardHand.FULL_HOUSE; break;
                case CamelCardHand.TWO_PAIR: handClassification = CamelCardHand.TWO_PAIR; break;
                case CamelCardHand.ONE_PAIR: {
                    if (card != foundPairCard) handClassification = CamelCardHand.TWO_PAIR; 
                    break;
                }
                default: { 
                    handClassification = CamelCardHand.ONE_PAIR; 
                    foundPairCard = card;
                    break;
                }
            }
        }
        if (cards.filter((val) => val == card).length == 3) {
            switch(handClassification) {
                case CamelCardHand.FULL_HOUSE: break;
                case CamelCardHand.ONE_PAIR: handClassification = CamelCardHand.FULL_HOUSE; break;
                default: handClassification = CamelCardHand.THREE_OF_A_KIND; break;
            }
        }
        if (cards.filter((val) => val == card).length == 4) {
            handClassification = CamelCardHand.FOUR_OF_A_KIND;
        }
        if (cards.filter((val) => val == card).length == 5) {
            handClassification = CamelCardHand.FIVE_OF_A_KIND;
        }
    });

    return handClassification;
}

export const classifyHandWithJoker = (hand: string): CamelCardHand => {
    const baseClass: CamelCardHand = classifyHand(hand);
    let newClass: CamelCardHand = baseClass;
    const numberOfJokers: number = [...hand].filter((val) => val == 'J').length;

    switch(baseClass) {
        case CamelCardHand.HIGH_CARD: {
            if (numberOfJokers == 1) { newClass = CamelCardHand.ONE_PAIR; break; }
        }
        case CamelCardHand.ONE_PAIR: {
            if (numberOfJokers == 1) { newClass = CamelCardHand.THREE_OF_A_KIND; break; }
            if (numberOfJokers == 2) { newClass = CamelCardHand.THREE_OF_A_KIND; break; }
        }
        case CamelCardHand.TWO_PAIR: {
            if (numberOfJokers == 1) { newClass = CamelCardHand.FULL_HOUSE; break }
            if (numberOfJokers == 2) { newClass = CamelCardHand.FOUR_OF_A_KIND; break; }
        }
        case CamelCardHand.THREE_OF_A_KIND: {
            if (numberOfJokers == 1) { newClass = CamelCardHand.FOUR_OF_A_KIND; break; }
            if (numberOfJokers == 3) { newClass = CamelCardHand.FOUR_OF_A_KIND; break; }
        }
        case CamelCardHand.FULL_HOUSE: {
            if (numberOfJokers == 2) { newClass = CamelCardHand.FIVE_OF_A_KIND; break; }
            if (numberOfJokers == 3) { newClass = CamelCardHand.FIVE_OF_A_KIND; break; }
        }
        case CamelCardHand.FOUR_OF_A_KIND: {
            if (numberOfJokers == 1) { newClass = CamelCardHand.FIVE_OF_A_KIND; break; }
            if (numberOfJokers == 4) { newClass = CamelCardHand.FIVE_OF_A_KIND; break; }
        }
    }

    return newClass;
}

export const handDataFromHand = (input: string): CCHandData => {
    const handBidSplit: Array<string> = input.split(" ");
    
    return {
        hand: handBidSplit[0],
        cardClass: classifyHand(handBidSplit[0]),
        bid: Number(handBidSplit[1])
    };
}

export const handDataFromHandWithJoker = (input: string): CCHandData => {
    const handBidSplit: Array<string> = input.split(" ");
    
    return {
        hand: handBidSplit[0],
        cardClass: classifyHandWithJoker(handBidSplit[0]),
        bid: Number(handBidSplit[1])
    };
}

export const mapCards = (card: string): number => {
    switch(card) {
        case 'A': return 14;
        case 'K': return 13;
        case 'Q': return 12;
        case 'J': return 11;
        case 'T': return 10;
        default: return Number(card);
    }
}

export const mapCardsWithJokers = (card: string): number => {
    switch(card) {
        case 'A': return 14;
        case 'K': return 13;
        case 'Q': return 12;
        case 'J': return 1;
        case 'T': return 10;
        default: return Number(card);
    }
}

export const sortHandArrayByWeakestToStrongest = (handArray: Array<CCHandData>): Array<CCHandData> => {
    return handArray.sort((n1, n2) => {
        if (n1.cardClass > n2.cardClass) {
            return 1;
        }
        if (n1.cardClass < n2.cardClass) {
            return -1;
        }
        const comparableCardsN1: Array<number> = [...n1.hand].map(mapCards);
        const comparableCardsN2: Array<number> = [...n2.hand].map(mapCards);

        for (let i = 0; i < 5; i++) {
            if (comparableCardsN1[i] > comparableCardsN2[i]) return 1;
            if (comparableCardsN1[i] < comparableCardsN2[i]) return -1;
        }

        return 0;
    })
};

export const sortHandArrayByWeakestToStrongestWithJokers = (handArray: Array<CCHandData>): Array<CCHandData> => {
    return handArray.sort((n1, n2) => {
        if (n1.cardClass > n2.cardClass) {
            return 1;
        }
        if (n1.cardClass < n2.cardClass) {
            return -1;
        }
        const comparableCardsN1: Array<number> = [...n1.hand].map(mapCardsWithJokers);
        const comparableCardsN2: Array<number> = [...n2.hand].map(mapCardsWithJokers);

        for (let i = 0; i < 5; i++) {
            if (comparableCardsN1[i] > comparableCardsN2[i]) return 1;
            if (comparableCardsN1[i] < comparableCardsN2[i]) return -1;
        }

        return 0;
    })
};

export const multiplyandSumWinningsForHands = (input: string): number => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const handArray: Array<CCHandData> = sanitisedString.split('\n').map(handDataFromHand);
    const sortedHandArray: Array<CCHandData> = sortHandArrayByWeakestToStrongest(handArray);

    let sum: number = 0;

    sortedHandArray.forEach((hand, index) => {
        sum += hand.bid * (index + 1);
    })

    return sum;
};

export const multiplyandSumWinningsForHandsWithJoker = (input: string): number => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const handArray: Array<CCHandData> = sanitisedString.split('\n').map(handDataFromHandWithJoker);
    const sortedHandArray: Array<CCHandData> = sortHandArrayByWeakestToStrongestWithJokers(handArray);

    let sum: number = 0;

    sortedHandArray.forEach((hand, index) => {
        sum += hand.bid * (index + 1);
    })

    return sum;
};