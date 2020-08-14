import { Vectors } from ".";

export type Vector = [number, number, number];

export function calculateVectorMagnitude(vec: Vector): number {
    return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2));
}

export function dotProductVectors(vecs: [Vector, Vector]): number {
    return vecs[0][0] * vecs[1][0] + vecs[0][1] * vecs[1][1] + vecs[0][2] * vecs[1][2];
};

export function crossProductVectors(vecs: [Vector, Vector]): Vector {
    return [
        vecs[0][1] * vecs[1][2] - vecs[0][2] * vecs[1][1],
        vecs[0][2] * vecs[1][0] - vecs[0][0] * vecs[1][2],
        vecs[0][0] * vecs[1][1] - vecs[0][1] * vecs[1][0],
    ];
}

export function substractVectors(vecs: [Vector, Vector]): Vector {
    return [
        vecs[0][0] - vecs[1][0],
        vecs[0][1] - vecs[1][1],
        vecs[0][2] - vecs[1][2],
    ];
}

export function divideVectorByScalar(vec: Vector, scalar: number): Vector {
    return [
        vec[0] / scalar,
        vec[1] / scalar,
        vec[2] / scalar,
    ];
}

export function noralizeVector(vec: Vector): Vector {;
    return divideVectorByScalar(vec, calculateVectorMagnitude(vec))
}