import * as React from 'react';
import {
    Flex,
    Divider,
} from '@chakra-ui/core';

export type SceneProps = {
    sizes: number[];
};

export function Scene(props: React.PropsWithChildren<SceneProps>) {
    const {
        sizes,
        children,
    } = props;

    const childrenList = React.Children.toArray(children);

    return (
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
                    {childrenList[0]}
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
                        {childrenList[1]}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}