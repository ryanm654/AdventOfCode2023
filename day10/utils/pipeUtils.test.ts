import * as fs from 'fs';
import { alreadyInConnections, findConnectingPipes, findFurthestStepsFromStart, findS, pipeConnectsEast, pipeConnectsNorth, pipeConnectsSouth, pipeConnectsWest } from './pipeUtils';
import { PipeArray, CoOrdinate } from "./Types";

describe("Pipe traversal utils", () => {
    test("pipeConnectsEast returns true for -, L and F", () => {
        expect(pipeConnectsEast('-')).toBeTruthy();
        expect(pipeConnectsEast('L')).toBeTruthy();
        expect(pipeConnectsEast('F')).toBeTruthy();
        expect(pipeConnectsEast('J')).toBeFalsy();
    });

    test("pipeConnectsWest returns true for -, J and 7", () => {
        expect(pipeConnectsWest('-')).toBeTruthy();
        expect(pipeConnectsWest('J')).toBeTruthy();
        expect(pipeConnectsWest('7')).toBeTruthy();
        expect(pipeConnectsWest('L')).toBeFalsy();
    });

    test("pipeConnectsSouth returns true for |, F and 7", () => {
        expect(pipeConnectsSouth('|')).toBeTruthy();
        expect(pipeConnectsSouth('F')).toBeTruthy();
        expect(pipeConnectsSouth('7')).toBeTruthy();
        expect(pipeConnectsSouth('-')).toBeFalsy();
    });

    test("pipeConnectsNorth returns true for |, L and J", () => {
        expect(pipeConnectsNorth('|')).toBeTruthy();
        expect(pipeConnectsNorth('L')).toBeTruthy();
        expect(pipeConnectsNorth('J')).toBeTruthy();
        expect(pipeConnectsNorth('F')).toBeFalsy();
    });

    test("alreadyInConnections returns true if coOrds already exist", () => {
        const array = [[1,1],[2,1],[3,1]];
        const input = [2,1];

        expect(alreadyInConnections(array, input)).toBeTruthy();
    })

    test("findConnectingPipe returns two indexs of pipes that connect to index", () => {
        const pipeArray: PipeArray = [
            [ '-', 'L', '|', 'F', '7' ],
            [ '7', 'S', '-', '7', '|' ],
            [ 'L', '|', '7', '|', '|' ],
            [ '-', 'L', '-', 'J', '|' ],
            [ 'L', '|', '-', 'J', 'F' ]
        ];
        const index: CoOrdinate = [1,1];
        const expected: Array<CoOrdinate> = [[2,1],[1,2]];

        const index2: CoOrdinate = [2,1];
        const expected2: Array<CoOrdinate> = [[1,1],[3,1]];

        expect(findConnectingPipes(pipeArray, index)).toEqual(expected);
        expect(findConnectingPipes(pipeArray, index2)).toEqual(expected2);
    })

    test("findS returns [2,1]", () => {
        const pipeArray: PipeArray = [
            [ '-', 'L', '|', 'F', '7' ],
            [ '7', '-', 'S', '7', '|' ],
            [ 'L', '|', '7', '|', '|' ],
            [ '-', 'L', '-', 'J', '|' ],
            [ 'L', '|', '-', 'J', 'F' ]
        ];
        const expected: CoOrdinate = [2,1];

        expect(findS(pipeArray)).toEqual(expected);
    })
});

describe("Day 10 Part 1", () => {
    test("Given test input 1, expect further point away to be 4 steps", () => {
        const input: string = fs.readFileSync('./day10/test1', 'utf-8');
        const expected = 4;

        expect(findFurthestStepsFromStart(input)).toEqual(expected);
    });

    test("Given test input 2, expect further point away to be 4 steps", () => {
        const input: string = fs.readFileSync('./day10/test2', 'utf-8');
        const expected = 8;

        expect(findFurthestStepsFromStart(input)).toEqual(expected);
    });
});