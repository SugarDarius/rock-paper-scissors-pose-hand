export type RPSLogicInput = 'rock' | 'paper' | 'scissors' | 'unknown';
export type RPSRules = { [key in RPSLogicInput]: RPSLogicInput[]}
export type RPSLogicReturnType = 0 | 1 | 2 | 3;

export function computeRPSWinner(inputs: [RPSLogicInput, RPSLogicInput]): RPSLogicReturnType {
    const rules: Omit<RPSRules, 'unknown'> = {
        rock: ['scissors'],
        paper: ['rock'],
        scissors: ['paper'],
    };
    
    return inputs[1] === 'unknown' ? 3 : inputs[0] === inputs[1] ? 0 : rules[inputs[0]].includes(inputs[1]) ? 1 : 2;
}