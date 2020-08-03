import * as React from 'react';

import { 
    Flex,
    Divider,
    Text,
    Box,
} from '@chakra-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { 
    useKey,
} from 'react-use';

import { 
    useShuffle,
    useSequenceRunner,
    useUserMedia,
} from '../hooks';

import { Flash } from './flash.component';
import { Canvas } from './canvas.component';
import { Camera } from './camera.component';

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

    const [ scores, setScores ] = React.useState<number[]>([0, 0]);
    const [ isPlaying, setIsPlayingState ] = React.useState<boolean>(false);
    const [ incantation, setIncantationValue ] = React.useState<'READY?' | 'ROCK!' | 'PAPER!' | 'SCISSORS!'>('READY?');
    const [ isVideoPlaying, setIsVideoPlaying ] = React.useState<boolean>(false);
    const [ isCanvasEmpty, setIsCanvasEmptyState ] = React.useState<boolean>(true);
    const [ isFlashing, setIsFlashingState ] = React.useState<boolean>(false);
    const [ listIsShuffled, setListIsShuffledState ] = React.useState<boolean>(false);
    const [ algoHand, setAlgoHand ] = React.useState<string | null>(null);

    const mediaStream = useUserMedia({
        audio: false,
        video: {
            facingMode: 'user',
            width: sizes[0],
            height: sizes[1],
        }
    });
    
    const { list, shuffle } = useShuffle<string>(['rock', 'paper', 'scissors']);

    const { isSequenceRunning, start } = useSequenceRunner([
        () => { setIncantationValue('ROCK!') },
        () => { setIncantationValue('PAPER!') },
        () => { setIncantationValue('SCISSORS!') },
    ], 800);

    useKey(' ', () => {
        if (!isPlaying && !disable) {
            setIsPlayingState(true);
        }
    }, { }, [isPlaying, disable]);

    React.useEffect(() => {
        if (isPlaying) {
            start();
        }
    }, [isPlaying]);

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
            console.log('time to predict with', algoHand);
        }
    }, [algoHand, isCanvasEmpty]);

    if (!!mediaStream && !!videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    const onCanPlay = () => {
        if (!!videoRef.current) {
            setIsVideoPlaying(true);
            videoRef.current.play();
        }
    };

    const reset = () => {
        if (!!canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.clearRect(0, 0, sizes[0], sizes[1]);
        }

        setIncantationValue('READY?');
        setIsPlayingState(false);
        setIsCanvasEmptyState(true);
        setIsFlashingState(false);
        setListIsShuffledState(false);
        setAlgoHand(null);
    };

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
            <Flex
                position='relative'
                direction='row'
                width='100%'
                height='auto'
                alignItems='center'
                justifyContent='center'
            >
                <Flex
                    direction='row'
                    width='100%'
                    height='auto'
                    alignItems='stretch'
                    justifyContent='center'
                >
                    <Flex
                        position='relative'
                        direction='column'
                        width='50%'
                        height='auto'
                        alignItems='center'
                        justifyContent='center'
                        padding='0 12px'
                    >
                        {
                            !isPlaying ? (
                                <React.Fragment>
                                    <Text as='span' fontWeight={500} fontSize='1.5rem' textAlign='center'>
                                        <FontAwesomeIcon icon={['fas', 'keyboard']} /><br />
                                        press space to start
                                    </Text>
                                    <Text as='span' textAlign='center'>
                                        After the incantation (Ready? - Rock! - Paper! - Scissors!) the camera will take a capture of your hand.<br />
                                        Be sure to have your hand clearly visbile in front the camera.
                                    </Text>
                                </React.Fragment>
                            ) : isEndGamePredicate ? ( 
                                <Text as='span' fontWeight={700} fontSize='6rem' textAlign='center'>
                                    <FontAwesomeIcon icon={['fas', icons[algoHand]]} />
                                </Text>
                            ) : (
                                <Text as='span' fontWeight={700} fontSize='3rem' textAlign='center'>
                                    {incantation}
                                </Text>
                            )
                        }
                    </Flex>
                    <Divider />
                    <Flex
                        position='relative'
                        direction='column'
                        width='50%'
                        height='auto'
                        alignItems='center'
                        justifyContent='center'
                        padding='0 12px'
                    >
                        <Flex
                            position='relative'
                            direction='column'
                            alignItems='center'
                            justifyContent='center'
                            width={sizes[0]}
                            height={sizes[1]}
                        >
                            {
                                !!mediaStream ? (
                                    <Camera
                                        ref={videoRef}
                                        isVideoPlaying={isVideoPlaying}
                                        width={sizes[0]}
                                        height={sizes[1]}
                                        onCanPlay={onCanPlay}
                                    />
                                ) : null
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
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                position='relative'
                direction='row'
                width='100%'
                height='auto'
                alignItems='center'
                justifyContent='center'
                padding='24px'
            >
                <Box position='relative'>
                    <Text as='span' fontSize='4rem' fontWeight={700}>
                        ALGO
                    </Text>
                </Box>
                <Flex
                    position='relative'
                    direction='row'
                    width='320px'
                    height='auto'
                    alignItems='center'
                    justifyContent='space-between'
                    margin='0 24px'
                >
                    <Text as='span' fontSize='4rem' fontWeight={700}>
                        {scores[0]}
                    </Text>
                    <Text as='span' fontSize='4rem' fontWeight={700}>
                        <FontAwesomeIcon icon={['fas', 'minus']} />
                    </Text>
                    <Text as='span' fontSize='4rem' fontWeight={700}>
                        {scores[1]}
                    </Text>
                </Flex>
                <Box position='relative'>
                    <Text as='span' fontSize='4rem' fontWeight={700}>
                        YOU
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}