import * as React from 'react';
import {
    Flex,
    Text,
} from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

export type Incantation = 'READY?' | 'ROCK!' | 'PAPER!' | 'SCISSORS!';

export type DisplayProps = {
    isModelLoading?: boolean;
    isModelError?: boolean;
    isPlayerPlaying?: boolean;
    isEndGame?: boolean;
    hasPrediction?: boolean;
    incantation: Incantation;
    handIcon: IconName;
};

export function Display(props: DisplayProps) {
    const {
        isModelLoading,
        isModelError,
        isPlayerPlaying,
        isEndGame,
        incantation,
        handIcon,
        hasPrediction,
    } = props;

    let content = null;

    if (isModelLoading) {
        content = (
            <FontAwesomeIcon
                icon={['fas', 'spinner']}
                size='4x'
                spin
                pulse 
            />
        );
    }
    else if (isModelError) {
        content = (
            <Text as='span' textAlign='center'>
                An error has occured while loading HandPose model!
            </Text>
        );
    }
    else if (isEndGame) {
        content = (
            <Flex
                position='relative'
                direction='column'
                width='100%'
                height='auto'
                alignItems='center'
                justifyContent='center'
            >
                <Text as='span' fontWeight={700} fontSize='6rem' textAlign='center'>
                    <FontAwesomeIcon icon={['fas', handIcon]} />
                </Text>
                {
                    !hasPrediction ? (
                        <Text as='span'>
                            <FontAwesomeIcon icon={['fas', 'spinner']} spin /> Getting prediction from the model your hand
                        </Text>
                    ) : null
                }
            </Flex>
        );
    }
    else if (!isPlayerPlaying) {
        content = (
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
        );
    }
    else {
        content = (
            <Text as='span' fontWeight={700} fontSize='3rem' textAlign='center'>
                {incantation}
            </Text>
        );
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}