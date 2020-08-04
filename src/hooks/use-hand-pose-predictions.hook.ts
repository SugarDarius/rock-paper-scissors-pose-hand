import * as React from 'react';
import * as tf from '@tensorflow/tfjs';
import { load, HandPose } from '@tensorflow-models/handpose';

import { RPSLogicInput } from '../logics';

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
    const [model, setModel] = React.useState<HandPose | null>(null);
    const [prediction, setPrediction] = React.useState<UseHandPredictionsType | null>(null);

    React.useEffect(() => {
        const loadModel = async (): Promise<void> => {
            try {
                await tf.setBackend('webgl');
                const loadedModel = await load();
                
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

    const getPrediction = ()  => {
        const estimateHands = async (): Promise<void> => {
            const predictions = await model.estimateHands(canvasRef.current);
            console.log('predictions', predictions);
            setPrediction('rock');
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