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

export type GreetingsModalProps = {
    open?: boolean;
    onClose: () => void;
}

export function GreetingsModal({ open, onClose }: GreetingsModalProps) {
    return (
        <Modal 
            isOpen={open} 
            isCentered
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
                        The main goal here is you use your own hand ✋ to play the game and to beat a simple shuffle array algorithm 😁
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