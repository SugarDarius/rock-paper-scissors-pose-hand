export type RPSLogicInput = 'rock' | 'paper' | 'scissors';
export type RPSRules = { [key in RPSLogicInput]: RPSLogicInput[]}
export type RPSLogicReturnType = 0 | 1 | 2;

export function computeRPSWinner(inputs: [RPSLogicInput, RPSLogicInput]): RPSLogicReturnType {
    const rules: RPSRules = {
        rock: ['scissors'],
        paper: ['rock'],
        scissors: ['paper'],
    };
    
    return inputs[0] === inputs[1] ? 0 : rules[inputs[0]].includes(inputs[1]) ? 1 : 2;
}