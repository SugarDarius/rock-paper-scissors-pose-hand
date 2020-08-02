import * as React from 'react';

export type UseShuffleReturnType<T> = {
    shuffle: () => void;
    result: T[];
};

export function useShuffle<T>(list: T[]): UseShuffleReturnType<T> {
    const [ result, setResult ] = React.useState<T[]>([]);

    const shuffle = <T>(list: T[]): void => {
        let shuffedList: typeof result = [];
        const length = list.length;

        if (length > 0) {
            let index = -1;
            const lastIndex = length - 1;

            while (++index) {
                const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
                const value = shuffedList[rand];

                shuffedList[rand] = shuffedList[index];
                shuffedList[index] = value;
            }

            setResult(shuffedList);
        }
    };

    return {
        shuffle: () => { shuffle(list) },
        result,
    };
} 