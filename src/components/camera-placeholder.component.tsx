import * as React from 'react';
import { Flex } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export type CameraPlaceholderProps = {
    showIcon?: boolean;
};

export function CameraPlaceholder({ showIcon }: CameraPlaceholderProps) {
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
            {
                showIcon ? (
                    <FontAwesomeIcon icon={['fas', 'video']} size='4x' />
                ) : null
            }
        </Flex>
    );
}