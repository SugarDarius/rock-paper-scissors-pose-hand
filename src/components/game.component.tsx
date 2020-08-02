import * as React from 'react';

import { 
    Flex,
    Divider,
    Text,
    Box,
} from '@chakra-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    useKey
} from 'react-use';

import { 
    useShuffle
} from '../hooks';

export type GameProps = {
    disable?: boolean;
};

export function Game({ disable }: GameProps) {
    const [ scores, setScores ] = React.useState<number[]>([0, 0]);
    const [ isPlaying, setIsPlayingState ] = React.useState<boolean>(false);

    const { result, shuffle } = useShuffle<string>(['rock', 'paper', 'scissors']);

    useKey(' ', () => {
        if (!isPlaying && !disable) {
            console.log('space bar pressed!');
        }
    }, { }, [isPlaying, disable]);

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
                                <Text as='span' fontWeight={500} fontSize='1.5rem' textAlign='center'>
                                    <FontAwesomeIcon icon={['fas', 'keyboard']} /><br />
                                    press space to start
                                </Text>
                            ) : null
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
                        <Box
                            width='640px'
                            height='500px'
                            backgroundColor='red.400' 
                        />
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