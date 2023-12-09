import * as fs from 'fs';
import { CamelCardHand } from "./CamelCardHand";
import { classifyHand, CCHandData, handDataFromHand, sortHandArrayByWeakestToStrongest, mapCards, multiplyandSumWinningsForHands, sortHandArrayByWeakestToStrongestWithJokers, handDataFromHandWithJoker, multiplyandSumWinningsForHandsWithJoker } from "./camelCardUtils";

describe("Classify Hand", () => {
    test("32T3K -> One Pair", () => {
        const input = "32T3K";
        const expected = CamelCardHand.ONE_PAIR;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("32T32 -> Two Pair", () => {
        const input = "32T32";
        const expected = CamelCardHand.TWO_PAIR;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("KK677 -> Two Pair", () => {
        const input = "KK677";
        const expected = CamelCardHand.TWO_PAIR;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("33T32 -> Three of a Kind", () => {
        const input = "33T32";
        const expected = CamelCardHand.THREE_OF_A_KIND;

        expect(classifyHand(input)).toEqual(expected);
    });
    
    test("33232 -> Full House", () => {
        const input = "33232";
        const expected = CamelCardHand.FULL_HOUSE;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("22333 -> Full House", () => {
        const input = "22333";
        const expected = CamelCardHand.FULL_HOUSE;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("23333 -> Four of a Kind", () => {
        const input = "23333";
        const expected = CamelCardHand.FOUR_OF_A_KIND;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("33333 -> Five of a Kind", () => {
        const input = "33333";
        const expected = CamelCardHand.FIVE_OF_A_KIND;

        expect(classifyHand(input)).toEqual(expected);
    });

    test("23456 -> High Card", () => {
        const input = "23456";
        const expected = CamelCardHand.HIGH_CARD;

        expect(classifyHand(input)).toEqual(expected);
    });
})

describe("Sort hands", () => {
    test("Sorts array of cards from weakest to strongest", () => {
        const handArray: Array<CCHandData> = [
            handDataFromHand("32T3K 765"),
            handDataFromHand("T55J5 684"),
            handDataFromHand("KK677 28"),
            handDataFromHand("KTJJT 220"),
            handDataFromHand("QQQJA 483")
        ];

        const expected: Array<CCHandData> = [
            handDataFromHand("32T3K 765"),
            handDataFromHand("KTJJT 220"),
            handDataFromHand("KK677 28"),
            handDataFromHand("T55J5 684"),
            handDataFromHand("QQQJA 483")
        ]

        const sortedHands = sortHandArrayByWeakestToStrongest(handArray);
        expect(sortedHands).toEqual(expected);
    })

    test("Sorts array of cards from weakest to strongest considering jokers", () => {
        const handArray: Array<CCHandData> = [
            handDataFromHandWithJoker("32T3K 765"),
            handDataFromHandWithJoker("T55J5 684"),
            handDataFromHandWithJoker("KK677 28"),
            handDataFromHandWithJoker("KTJJT 220"),
            handDataFromHandWithJoker("QQQJA 483")
        ];

        const expected: Array<CCHandData> = [
            handDataFromHandWithJoker("32T3K 765"),
            handDataFromHandWithJoker("KK677 28"),
            handDataFromHandWithJoker("T55J5 684"),
            handDataFromHandWithJoker("QQQJA 483"),
            handDataFromHandWithJoker("KTJJT 220"),
        ]

        const sortedHands = sortHandArrayByWeakestToStrongestWithJokers(handArray);
        expect(sortedHands).toEqual(expected);
    })
});

describe("Other utils", () => {
    test("Create 'hand' object with bid and card classification", () => {
        const input: string = "32T3K 765";
        const expected: CCHandData = {
            hand: "32T3K",
            cardClass: CamelCardHand.ONE_PAIR,
            bid: 765
        };

        expect(handDataFromHand(input)).toEqual(expected);
    })

    test("Map cards maps as expected", () => {
        expect(mapCards('A')).toEqual(14);
        expect(mapCards('K')).toEqual(13);
        expect(mapCards('Q')).toEqual(12);
        expect(mapCards('J')).toEqual(11);
        expect(mapCards('T')).toEqual(10);
        expect(mapCards('4')).toEqual(4);
    })
})

describe("Day 7 Part 1", () => {
    test("Given test input, answer is 6440", () => {
        const input: string = fs.readFileSync('./day7/testInput', 'utf-8');
        const expected: number = 6440;

        expect(multiplyandSumWinningsForHands(input)).toEqual(expected);
    }) 
});

describe("Day 7 Part 2", () => {
    test("Given test input, answer is 5905", () => {
        const input: string = fs.readFileSync('./day7/testInput', 'utf-8');
        const expected: number = 5905;

        expect(multiplyandSumWinningsForHandsWithJoker(input)).toEqual(expected);
    }) 
});