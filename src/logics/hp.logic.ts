import { RPSLogicInput } from './rps.logic';

export type HPBoundingBox = {
    topLeft: [number, number];
    bottomRight: [number, number];
};

export type HPAnnoations = { [key: string]: [number, number, number][]; };

export type HPOpenFingersReturnType = {
    thumb: boolean;
    index: boolean;
    middle: boolean;
    ring: boolean;
    pinky: boolean;
};

export function computeHPOpenFingers(annotations: HPAnnoations): HPOpenFingersReturnType {
    console.log(annotations);
    const { 
        thumb,
        indexFinger,
        middleFinger,
        ringFinger,
        pinky
    } = annotations;

    const hand: 'left' | 'right' = thumb[0][0] > pinky[0][0] ? 'left' : 'right';

    const iThumbOpen = hand === 'left' ? thumb[0][0] > indexFinger[0][0] : thumb[0][0] < indexFinger[0][0];
    const isIndexOpen = indexFinger[0][1] > indexFinger[indexFinger.length -1][1];
    const isMiddleOpen = middleFinger[0][1] > middleFinger[middleFinger.length - 1][1];
    const isRingOpen = ringFinger[0][1] > ringFinger[ringFinger.length - 1][1];
    const isPinkyOpen = pinky[0][1] > pinky[pinky.length - 1][1];

    return {
        thumb: iThumbOpen,
        index: isIndexOpen,
        middle: isMiddleOpen,
        ring: isRingOpen,
        pinky: isPinkyOpen,
    };
}

export function computeHPHandShape(boundingBox: HPBoundingBox, annotations: HPAnnoations): RPSLogicInput {
    const {
        thumb,
        index,
        middle,
        ring,
        pinky,
    } = computeHPOpenFingers(annotations);

    console.log('thumb', thumb);
    console.log('index', index);
    console.log('middle', middle);
    console.log('ring', ring);
    console.log('pinky', pinky);

    if (!thumb && !index && !middle && !ring) {
        return 'rock';
    }
    else if (index && middle && !thumb && !ring && !pinky) {
        return "scissors"
    }
    // omitting thunb for now - need some rework later
    else if (index && middle && ring && pinky) {
        return 'paper';
    }

    return 'unknown';
}