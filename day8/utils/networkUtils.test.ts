import * as fs from 'fs';
import { allNodesEndInZ, allZNodesFound, buildNetwork, decideNextNode, findStartingNodes, findStepsToReachZSimul, findStepsToReachZZZ, findZZZAndReturnCount, nodeEndsInZ } from './networkUtils';

describe("Network builder", () => {
    test("Given array of strings, build the correct network map", () => {
        const input: Array<string> = ["AAA = (BBB, CCC)", "BBB = (DDD, EEE)"];
        const expected: Map<string, Array<string>> 
            = new Map([
                ['AAA', ['BBB', 'CCC']],
                ['BBB', ['DDD', 'EEE']]
            ]);

        expect(buildNetwork(input)).toEqual(expected);
    })
});

describe("Network traversal", () => {
    test("Given L, choose first value of array", () => {
        const instruction = 'L';
        const choices = ['BBB', 'CCC'];
        const expected = 'BBB';

        expect(decideNextNode(instruction, choices)).toEqual(expected);
    });

    test("Given R, choose second value of array", () => {
        const instruction = 'R';
        const choices = ['BBB', 'CCC'];
        const expected = 'CCC';

        expect(decideNextNode(instruction, choices)).toEqual(expected);
    });

    test("Given instructions and network, find ZZZ and return steps taken", () => {
        const instructions = 'LR';
        const network: Map<string, Array<string>> = new Map([
            ['AAA', ['BBB', 'CCC']],
            ['BBB', ['AAA', 'ZZZ']]
        ]);
        const expected = 2;

        expect(findZZZAndReturnCount(instructions, network)).toEqual(expected);
    })

    test("Given a network, return all nodes ending in A for starting node set", () => {
        const input: Map<string, Array<string>> = new Map([
            ['11A', ['BBB', 'CCC']],
            ['11B', ['AAA', 'ZZZ']],
            ['22A', ['AAA', 'ZZZ']],
            ['22B', ['AAA', 'ZZZ']]
        ]);
        const expected = ['11A', '22A'];

        expect(findStartingNodes(input)).toEqual(expected);
    });

    test("Given a set of nodes all ending in Z, return true on check", () => {
        const input: Array<string> = ['11Z', '22Z', '33Z'];
        
        expect(allNodesEndInZ(input)).toBeTruthy();
    });

    test("Given a set of nodes not all ending in Z, return true on check", () => {
        const input: Array<string> = ['11Z', '22Z', '33P'];
        
        expect(allNodesEndInZ(input)).toBeFalsy();
    });

    test("Node ends in Z match works", () => {
        const input: string = '11Z';
        const expected: boolean = true;

        expect(nodeEndsInZ(input)).toEqual(expected);
        expect(nodeEndsInZ('11D')).toEqual(false);
    })

    test("All Z nodes found", () => {
        const falseInput: Array<number> = [5, 8, -1, 10, 12];
        const trueInput: Array<number> = [5, 8, 12, 10, 12];

        expect(allZNodesFound(falseInput)).toEqual(false);
        expect(allZNodesFound(trueInput)).toEqual(true);
    })
})

describe("Day 8 Part 1", () => {
    test("Given 1st test input, ZZZ takes 2 steps to reach", () => {
        const input: string = fs.readFileSync('./day8/testInput1', 'utf-8')
        const expected: number = 2;

        expect(findStepsToReachZZZ(input)).toEqual(expected);
    });

    test("Given 2nd test input, ZZZ takes 6 steps to reach", () => {
        const input: string = fs.readFileSync('./day8/testInput2', 'utf-8')
        const expected: number = 6;

        expect(findStepsToReachZZZ(input)).toEqual(expected);
    });
})

describe("Day 8 Part 2", () => {
    test("Given 3rd test input, all Z enders simultaneously takes 6 steps to reach", () => {
        const input: string = fs.readFileSync('./day8/testInput3', 'utf-8');
        const expected: number = 6;

        expect(findStepsToReachZSimul(input)).toEqual(expected);
    })
})