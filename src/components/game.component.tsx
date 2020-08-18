import * as React from 'react';

import {  Flex } from '@chakra-ui/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { useKey } from 'react-use';

import { 
    useShuffle,
    useSequenceRunner,
    useUserMedia,
    useHandPosePredictions,
} from '../hooks';

import { computeRPSWinner, RPSLogicInput } from '../logics';

import { Flash } from './flash.component';
import { Canvas } from './canvas.component';
import { CameraPlaceholder } from './camera-placeholder.component';
import { NoCamera } from './no-camera.component';
import { Camera } from './camera.component';
import { Scene } from './scene.component';
import { Display, Incantation } from './display.component';
import { Scores } from './scores.component';
import { ResultsModal } from './results-modal.component'

export type HandState = RPSLogicInput | null;

export type GameProps = {
    disable?: boolean;
};

export function Game({ disable }: GameProps) {
    const sizes = [600, 480];
    const icons: { [key: string]: IconName; } = {
        rock: 'hand-rock',
        paper: 'hand-paper',
        scissors: 'hand-scissors',
    };

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const [scores, setScores] = React.useState<number[]>([0, 0]);
    const [isPlayerPlaying, setIsPlayerPlayingState] = React.useState<boolean>(false);
    const [incantation, setIncantationValue] = React.useState<Incantation>('READY?');
    const [isVideoPlaying, setIsVideoPlaying] = React.useState<boolean>(false);
    const [isCanvasEmpty, setIsCanvasEmptyState] = React.useState<boolean>(true);
    const [isFlashing, setIsFlashingState] = React.useState<boolean>(false);
    const [listIsShuffled, setListIsShuffledState] = React.useState<boolean>(false);
    const [algoHand, setAlgoHand] = React.useState<HandState>(null);
    const [showResults, setShowResultsState] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<0 | 1 | 2 | 3>(0);

    const {
        loading,
        error,
        getPrediction,
        resetPrediction,
        prediction
    } = useHandPosePredictions(canvasRef);

    const { mediaStream, getMediaStream } = useUserMedia({
        audio: false,
        video: {
            facingMode: 'user',
            width: sizes[0],
            height: sizes[1],
        }
    });
    
    const { list, shuffle } = useShuffle<HandState>(['rock', 'paper', 'scissors']);

    const { isSequenceRunning, start } = useSequenceRunner([
        () => { setIncantationValue('ROCK!') },
        () => { setIncantationValue('PAPER!') },
        () => { setIncantationValue('SCISSORS!') },
    ], 800);

    React.useEffect(() => {
        if (!loading && !error) {
            getMediaStream();
        }
    }, [loading, error]);

    useKey(' ', () => {
        if (!isPlayerPlaying && !disable && !loading && !error && !!mediaStream) {
            setIsPlayerPlayingState(true);
        }
    }, { }, [isPlayerPlaying, disable, loading, error, mediaStream]);

    React.useEffect(() => {
        if (isPlayerPlaying) {
            start();
        }
    }, [isPlayerPlaying]);

    React.useEffect(() => {
        if (!isSequenceRunning && incantation === 'SCISSORS!') {
            shuffle();
            setListIsShuffledState(true);
            onCaptureCanvas();
        }
    }, [isSequenceRunning, incantation]);

    React.useEffect(() => {
        if (!isCanvasEmpty && incantation === 'SCISSORS!' && listIsShuffled && !algoHand) {
            const rand = Math.floor(Math.random() * list.length);
            setAlgoHand(list[rand]);
        }
    }, [isCanvasEmpty, incantation, listIsShuffled, algoHand, list]);

    React.useEffect(() => {
        if (!!algoHand && !isCanvasEmpty) {
            getPrediction();
        }
    }, [algoHand, isCanvasEmpty]);

    React.useEffect(() => {
        if (!!prediction && !!algoHand) {
            const winner = computeRPSWinner([algoHand, prediction]);

            setScores([
                scores[0] + (winner === 1 ? 1 : 0), 
                scores[1] + (winner === 2 ? 1 : 0), 
            ]);
            setResult(winner);
            setShowResultsState(true);
        }
    }, [prediction, algoHand]);

    const onCanPlay = () => {
        if (!!videoRef.current) {
            setIsVideoPlaying(true);
            videoRef.current.play();
        }
    };

    const onCaptureCanvas = () => {
        if (!!canvasRef.current && !!videoRef.current) {
            const context = canvasRef.current.getContext('2d');

            context.drawImage(
                videoRef.current,
                0,
                0,
                sizes[0],
                sizes[1],
                0,
                0,
                sizes[0],
                sizes[1],
            );

            setIsCanvasEmptyState(false);
            setIsFlashingState(true);
        }
    };

    const reset = () => {
        if (!!canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.clearRect(0, 0, sizes[0], sizes[1]);
        }

        setIncantationValue('READY?');
        setIsPlayerPlayingState(false);
        setIsCanvasEmptyState(true);
        setIsFlashingState(false);
        setListIsShuffledState(false);
        setAlgoHand(null);
        resetPrediction();
        setShowResultsState(false);
        setResult(0);
    };

    if (!!mediaStream && !!videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    const isEndGamePredicate = !isCanvasEmpty && incantation === 'SCISSORS!' && listIsShuffled && !!algoHand;

    return (
        <Flex
            position='relative'
            direction='column'
            width='100%'
            height='auto'
            alignItems='center'
            justifyContent='center'
        >
            <Scene sizes={sizes}>
                <Display
                    isModelLoading={loading}
                    isModelError={!!error}
                    isPlayerPlaying={isPlayerPlaying}
                    isEndGame={isEndGamePredicate}
                    hasPrediction={!!prediction}
                    incantation={incantation}
                    handIcon={!!algoHand ? icons[algoHand] : 'hand-peace'}
                />
                <React.Fragment>
                    <CameraPlaceholder showIcon={!mediaStream} />
                    {
                        !!mediaStream ? (
                            <Camera
                                ref={videoRef}
                                isVideoPlaying={isVideoPlaying}
                                width={sizes[0]}
                                height={sizes[1]}
                                onCanPlay={onCanPlay}
                            />
                        ) : (
                                <NoCamera />
                            )
                    }
                    <Canvas
                        ref={canvasRef}
                        width={sizes[0]}
                        height={sizes[1]}
                    />
                    <Flash
                        flash={isFlashing}
                        onAnimationEnd={() => {
                            setIsFlashingState(false);
                        }}
                    />
                </React.Fragment>
            </Scene>
            <Scores scores={scores} />
            <ResultsModal
                open={showResults}
                onClose={() => {
                    reset();
                }}
                result={result}
            />
        </Flex>
    );
}