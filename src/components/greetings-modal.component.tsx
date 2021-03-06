import * as React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    Button,
    Link,
} from '@chakra-ui/core';

import { noop } from '../utils';

export type GreetingsModalProps = {
    open?: boolean;
    onClose: () => void;
}

export function GreetingsModal({ open, onClose }: GreetingsModalProps) {
    return (
        <Modal 
            isOpen={open} 
            isCentered
            onClose={noop}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Greetings! 👋
                </ModalHeader>
                <ModalBody>
                    <Text fontSize='md'>
                        This webapp is a Rock Paper Scissors game!<br />
                        It use the power of <Link isExternal href='https://www.tensorflow.org/js'>TensorflowJS</Link> and the <Link isExternal href='https://github.com/tensorflow/tfjs-models/tree/master/handpose'>HandPose model</Link>
                    </Text>
                    <Text fontSize='md'>
                        The main goal here is you use your own hand ✋ to play the game and to beat a simple shuffle array algorithm with random selection 😁
                    </Text>
                    <Text fontSize='sm' mt='10px'>
                        To play be sure to authorize this webapp to access to your camera. Without it you will be able to play. <br />
                        The camera stream is only into your browser, it's not recorded on any kind of servers.<br />
                        Your data is your own data.
                    </Text>
                    <Text fontSize='sm' mt='10px'>
                        As this webapp use <Link isExternal href='https://www.tensorflow.org/js'>TensorflowJS</Link> a connection to internet is required.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variantColor='blue'
                        onClick={onClose}
                    >
                        Let's play!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}