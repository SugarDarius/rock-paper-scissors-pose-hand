import { RPSLogicInput } from './rps.logic';

export type HPBoundingBox = {
    topLeft: [number, number];
    bottomRight: [number, number];
};

export type HPAnnoations = { [key: string]: [number, number, number][]; };

export function computeHPFingersOpen(boundingBox: HPBoundingBox, annotations: HPAnnoations) {

}

export function computeHPHandShape(boundingBox: HPBoundingBox, annotations: HPAnnoations): RPSLogicInput {
    return 'rock';
}