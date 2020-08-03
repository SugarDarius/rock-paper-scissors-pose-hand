import * as React from 'react';
import { useInterval } from 'react-use';

export type UseSequenceRunnerItem = () => void;

export type UseSequenceRunnerReturnType = {
    isSequenceRunning: boolean;
    start: () => void;
    stop: () => void;
};

export function useSequenceRunner(sequence: UseSequenceRunnerItem[], initialDelay: number): UseSequenceRunnerReturnType {
    const [ isRunning, setIsRunningState ] = React.useState<boolean>(false);
    const [ delay, setDelay ] = React.useState<number>(initialDelay);
    const [ seqIndex, setSeqIndex ] = React.useState<number>(0);

    const start = () => {
        setIsRunningState(true);
    };

    const stop = () => {
        setIsRunningState(false);
    };

    useInterval(() => {
        if (!!sequence[seqIndex] && !(seqIndex > sequence.length - 1)) {
            setSeqIndex(seqIndex + 1);
            sequence[seqIndex]();
        }
        else {
            setIsRunningState(false);
        }
    }, isRunning ? delay : null);

    return {
        isSequenceRunning: isRunning,
        start: () => { start(); },
        stop: () => { stop(); },
    };
}