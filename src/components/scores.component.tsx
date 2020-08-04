import * as React from 'react';
import { 
    Flex,
    Box,
    Text,
} from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ScoresProps = {
    scores: number[];
};

export function Scores(props: ScoresProps) {
    const { scores } = props;

    return (
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
    );
}