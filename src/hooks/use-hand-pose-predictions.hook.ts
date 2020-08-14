import * as React from 'react';
import * as tfjs from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

import { RPSLogicInput, computeHPHandShape } from '../logics';

export type UseHandPredictionsType = RPSLogicInput; 

export type UseHandPredictionsReturnType = {
    getPrediction: () => void;
    resetPrediction: () => void;
    prediction: UseHandPredictionsType | null;
    loading?: boolean;
    error?: any;
};

export function useHandPosePredictions(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [model, setModel] = React.useState<any | null>(null);
    const [prediction, setPrediction] = React.useState<UseHandPredictionsType | null>(null);

    React.useEffect(() => {
        const loadModel = async (): Promise<void> => {
            try {
                await tfjs.setBackend('webgl');
                const loadedModel = await handpose.load();
                
                setLoading(false);
                setModel(loadedModel);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        };

        if (!model && !!canvasRef.current && loading) {
            loadModel();
        }
    }, [canvasRef, model, loading]);

    const getPrediction = () => {
        const estimateHands = async (): Promise<void> => {
            const predictions = await model.estimateHands(canvasRef.current);
            if (predictions.length > 0) {
                const { annotations } = predictions[0];
                const handShape = await computeHPHandShape(annotations);
                console.log('hand shape', handShape);

                setPrediction(handShape);
                
            }
            else {
                setPrediction('unknown');
            }
        };

        if (!!model && !!canvasRef.current) {
            estimateHands();
        }
    };

    return {
        getPrediction,
        resetPrediction: () => { setPrediction(null); },
        prediction,
        loading,
        error,
    };
}