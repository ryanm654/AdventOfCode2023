
export const buildNetwork = (lines: Array<string>): Map<string, Array<string>> => {
    let network: Map<string, Array<string>> = new Map;
    
    lines.forEach((line) => {
        const keyValueSplit = line.split(' = ');
        const key = keyValueSplit[0];
        const values = keyValueSplit[1].replace(/[^a-zA-Z0-9 _]/g, '').split(' ');

        network.set(key, values)
    })

    return network;
}

export const decideNextNode = (instruction: string, choices: Array<string> | undefined): string => {
    if (choices == undefined) return '';
    return instruction == 'L' ? choices[0]: choices[1];
};

export const findZZZAndReturnCount = (instructions: string, network: Map<string, Array<string>>): number => {
    const instructionArray: Array<string> = [...instructions];
    let currentNode: string = 'AAA';
    let index: number = 0;
    let stepCount: number = 0;

    while (currentNode != 'ZZZ' && currentNode != '') {
        currentNode = decideNextNode(instructionArray[index], network.get(currentNode));
        stepCount++;
        index++;
        if (index >= instructionArray.length) index = 0;
    }

    return stepCount;
};

export const findStepsToReachZZZ = (input: string): number => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const instructionsNetworkSplit: Array<string> = sanitisedString.split('\n\n');
    const instructions: string = instructionsNetworkSplit[0];
    const networkLines: Array<string> = instructionsNetworkSplit[1].split('\n');
    const network: Map<string, Array<string>> = buildNetwork(networkLines);
    
    return findZZZAndReturnCount(instructions, network);
};

// Part 2

export const noUndefinedNodes = (nodes: Array<string>): boolean => {
    if (nodes.filter((val) => val == '').length > 1) {
        console.log('Network traversal error');
        return false;
    }
    return true;
}

export const allNodesEndInZ = (nodes: Array<string>): boolean => {
    return nodes.filter((val) => !val.match(/\S\SZ/)).length == 0;
}

export const nodeEndsInZ = (node: string): boolean => {
    return node.match(/\S\SZ/g) != null;
}

export const allZNodesFound = (nodeSteps: Array<number>): boolean => {
    return nodeSteps.filter((val) => val == -1).length == 0;
} 

/* I'm annoyed with the solution for this one so I'm just
   stealing some lcm methods I found to be done with it quicker */
const gcd = (a: number, b: number): number => b == 0 ? a : gcd (b, a % b)
const lcm = (a: number, b: number): number =>  a / gcd (a, b) * b
const lcmAll = (ns: Array<number>): number => ns .reduce (lcm, 1)

export const findEndingNodesForStartingNodesAndCount = (instructions: string, 
                                                        network: Map<string, Array<string>>, 
                                                        startingNodes: Array<string>): number => {
    const instructionArray: Array<string> = [...instructions];
    let currentNodes: Array<string> = startingNodes;
    let insIndex: number = 0;
    let stepCount: number = 0;

    let stepsToZInEachNode: Array<number> = new Array<number>(currentNodes.length).fill(-1);

    while (!(allZNodesFound(stepsToZInEachNode)) && noUndefinedNodes(currentNodes)) {
        stepCount++;
        currentNodes.forEach((node, i) => {
            currentNodes[i] = decideNextNode(instructionArray[insIndex], network.get(node));
            if (stepsToZInEachNode[i] == -1 && nodeEndsInZ(currentNodes[i])) {
                stepsToZInEachNode[i] = stepCount;
            }
        })
        insIndex++;
        if (insIndex >= instructionArray.length) insIndex = 0;
        
    }

    return lcmAll(stepsToZInEachNode);
}

export const findStartingNodes = (network: Map<string, Array<string>>): Array<string> => {
    let startingNodes: Array<string> = [];

    network.forEach((val, key) => {
        if (key.match(/[\S][\S]A/)) startingNodes.push(key);
    })

    return startingNodes;
}

export const findStepsToReachZSimul = (input: string): number => {
    const sanitisedString: string = input.replace(/\r/g, '');
    const instructionsNetworkSplit: Array<string> = sanitisedString.split('\n\n');
    const instructions: string = instructionsNetworkSplit[0];
    const networkLines: Array<string> = instructionsNetworkSplit[1].split('\n');
    const network: Map<string, Array<string>> = buildNetwork(networkLines);
    const startingNodes: Array<string> = findStartingNodes(network);

    return findEndingNodesForStartingNodesAndCount(instructions, network, startingNodes);
}