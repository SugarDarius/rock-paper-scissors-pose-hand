import { Vectors, Angles } from '../utils';
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

export async function computeHPOpenFinger(points: HPPoint[]): Promise<boolean> {
    const angleOfCurve = await new Promise<number>((resolve) => {

        const q1 = Vectors.substractVectors([points[1], points[0]]);
        const q2 = Vectors.substractVectors([points[2], points[1]]);
        const q3 = Vectors.substractVectors([points[3], points[2]]);

        const crossQ1Q2 = Vectors.crossProductVectors([q1, q2]);
        const crossQ2Q3 = Vectors.crossProductVectors([q2, q3]);

        const n1 = Vectors.divideVectorByScalar(crossQ1Q2, Math.sqrt(Vectors.dotProductVectors([crossQ1Q2, crossQ1Q2])));
        const n2 = Vectors.divideVectorByScalar(crossQ2Q3, Math.sqrt(Vectors.dotProductVectors([crossQ2Q3, crossQ2Q3])));

        const u1 = n2;
        const u3 = Vectors.divideVectorByScalar(q2, Math.sqrt(Vectors.dotProductVectors([q2, q2])));
        const u2 = Vectors.crossProductVectors([u3, u1]);

        const cosTheta = Vectors.dotProductVectors([n1, u1]);
        const sinTheta = Vectors.dotProductVectors([n1, u2]);

        const theta = Angles.convertToDegress(Math.atan2(sinTheta, cosTheta) * -1);

        console.log('theta', theta);

        resolve(0);
    });

    return angleOfCurve > 60.0;
}

export async function computeHPOpenFingers(annotations: HPAnnoations): Promise<HPOpenFingersReturnType> {
    console.log(annotations);
    const { 
        thumb,
        indexFinger,
        middleFinger,
        ringFinger,
        pinky
    } = annotations;

    const iThumbOpen = await computeHPOpenFinger(thumb);
    const isIndexOpen = await computeHPOpenFinger(indexFinger);
    const isMiddleOpen = await computeHPOpenFinger(middleFinger);
    const isRingOpen = await computeHPOpenFinger(ringFinger)
    const isPinkyOpen = await computeHPOpenFinger(pinky);

    return {
        thumb: iThumbOpen,
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
    else if (thumb && index && middle && ring && pinky) {
        return 'paper';
    }

    return 'unknown';
}