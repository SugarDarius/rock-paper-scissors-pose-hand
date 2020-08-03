import * as React from 'react';

import { 
    Flex,
    Divider,
    Text,
    Box,
} from '@chakra-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    useKey,
} from 'react-use';

import { 
    useShuffle,
    useSequenceRunner,
} from '../hooks';

import { Camera } from './camera.component';

export type GameProps = {
    disable?: boolean;
};

export function Game({ disable }: GameProps) {
    const [ scores, setScores ] = React.useState<number[]>([0, 0]);
    const [ isPlaying, setIsPlayingState ] = React.useState<boolean>(false);
    const [ incantation, setIncantationValue ] = React.useState<'READY?' | 'ROCK!' | 'PAPER!' | 'SCISSORS!'>('READY?');

    const { list, shuffle } = useShuffle<string>(['rock', 'paper', 'scissors']);

    const { isSequenceRunning, start, } = useSequenceRunner([
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

    React.useEffect(() => {
        if (!isSequenceRunning && incantation === 'SCISSORS!') {
            console.log('take hand snapshot');
        }
    }, [isSequenceRunning, incantation]);

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
                            width='640px'
                            height='500px'
                        >
                            <Camera />
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