import * as React from 'react';
import { Flex } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function NoCamera() {
    return (
        <Flex
            pos='absolute'
            top={0}
            left={0}
            width='100%'
            height='100%'
            justifyContent='center'
            alignItems='center'
        >
            <FontAwesomeIcon icon={['fas', 'video-slash']} size='4x' />
        </Flex>
    );
}