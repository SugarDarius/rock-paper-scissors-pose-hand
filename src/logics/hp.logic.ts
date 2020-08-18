import { Angles } from '../utils';
import { RPSLogicInput } from './rps.logic';

export type HPPoint = [number, number, number];
export type HPAnnoations = { [key: string]: HPPoint[]; };

export type HPOpenFingersReturnType = {
    thumb: boolean;
    index: boolean;
    middle: boolean;
    ring: boolean;
    pinky: boolean;
};

export async function computeHPOpenFinger(
    strPoint: HPPoint,
    midPoint: HPPoint,
    endPoint: HPPoint,
): Promise<boolean> {
    const angleOfCurve = await new Promise<number>((resolve) => {
        const strMidXDist = strPoint[0] - midPoint[0];
        const strEndXDist = strPoint[0] - endPoint[0];
        const midEndXDist = midPoint[0] - endPoint[0];

        const strMidYDist = strPoint[1] - midPoint[1];
        const strEndYDist = strPoint[1] - endPoint[1];
        const midEndYDist = midPoint[1] - endPoint[1];

        const strMidZDist = strPoint[2] - midPoint[2];
        const strEndZDist = strPoint[2] - endPoint[2];
        const midEndZDist = midPoint[2] - endPoint[2];

        const strMidDist = Math.sqrt(Math.pow(strMidXDist, 2) + Math.pow(strMidYDist, 2) + Math.pow(strMidZDist, 2));
        const strEndDist = Math.sqrt(Math.pow(strEndXDist, 2) + Math.pow(strEndYDist, 2) + Math.pow(strEndZDist, 2));
        const midEndDist = Math.sqrt(Math.pow(midEndXDist, 2) + Math.pow(midEndYDist, 2) + Math.pow(midEndZDist, 2));

        const cosIn = (Math.pow(midEndDist, 2) + Math.pow(strMidDist, 2) - Math.pow(strEndDist, 2)) / (2 * midEndDist * strMidDist);

        // console.log('cosIn', cosIn);

        const radAngleOfCurve = Math.acos(cosIn > 1.0 ? 1.0 : cosIn < -1.0 ? -1.0 : cosIn);
        // console.log('radAngleOfCurve', radAngleOfCurve);

        const degAngleOfCurve = Angles.convertToDegress(radAngleOfCurve);

        // console.log('degAngleOfCurve', degAngleOfCurve);

        resolve(degAngleOfCurve);
    });

    return angleOfCurve > 130.0;
}

export async function computeHPOpenFingers(annotations: HPAnnoations): Promise<HPOpenFingersReturnType> {
    // console.log(annotations);
    const { 
        thumb,
        indexFinger,
        middleFinger,
        ringFinger,
        pinky,
        palmBase,
    } = annotations;

    const isThumbOpen = await computeHPOpenFinger(
        thumb[0],
        thumb[1],
        thumb[3],
    );

    const isIndexOpen = await computeHPOpenFinger(
        palmBase[0],
        indexFinger[1],
        indexFinger[3],
    );

    const isMiddleOpen = await computeHPOpenFinger(
        palmBase[0],
        middleFinger[1],
        middleFinger[3],
    );

    const isRingOpen = await computeHPOpenFinger(
        palmBase[0],
        ringFinger[1],
        ringFinger[3],
    );

    const isPinkyOpen = await computeHPOpenFinger(
        palmBase[0],
        pinky[1],
        pinky[3],
    );

    return {
        thumb: isThumbOpen,
        index: isIndexOpen,
        middle: isMiddleOpen,
        ring: isRingOpen,
        pinky: isPinkyOpen,
    };
}

export async function computeHPHandShape(annotations: HPAnnoations): Promise<RPSLogicInput> {
    const {
        thumb,
        index,
        middle,
        ring,
        pinky,
    } = await computeHPOpenFingers(annotations);

    console.log('##############');
    console.log('thumb', thumb);
    console.log('index', index);
    console.log('middle', middle);
    console.log('ring', ring);
    console.log('pinky', pinky);
    console.log('##############');

    if (!thumb && !index && !middle && !ring) {
        return 'rock';
    }
    else if (index && middle && !thumb && !ring && !pinky) {
        return "scissors"
    }
    else if (thumb && index && middle && ring && pinky) {
        return 'paper';
    }

    return 'unknown';
}