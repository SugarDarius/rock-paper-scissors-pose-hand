import * as React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Flex,
    Text,
    Button,
    Link,
} from '@chakra-ui/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ResultsModalProps = {
    open?: boolean;
    onClose: () => void;
    result: 0 | 1 | 2;
    noPrediction?: boolean;
}

export function ResultsModal(props: ResultsModalProps) {
    const {
        open,
        onClose,
        result,
        noPrediction,
    } = props;

    const icons: { [key: number]: IconName } = {
        0: 'american-sign-language-interpreting',
        1: 'frown',
        2: 'trophy',
    };

    const headlines: { [key: number]: string } = {
        0: `IT'S MATCH! 🤪`,
        1: 'OH NO! 🥺',
        2: 'BRAVO! 🎉🎉',
    };

    const subheadlines: { [key: number]: string } = { 
        0: `You and the ALGO where on the thoughts`,
        1: `Play another round to beat the ALGO 😀`,
        2: `It's a win! Well done!`,
    };

    const icon: IconName = noPrediction ? 'bug' : icons[result];
    const headline: string = noPrediction ? `'SORRY! 🤔` : headlines[result];
    const subheadline: string = noPrediction ? `HandProse model could not find any prediction for your hand` : subheadlines[result];

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Flex
                        position='relative'
                        flexDirection='column'
                        width='100%'
                        height='auto'
                        justifyContent='center'
                        alignItems='center'
                        padding='24px'
                    >
                        <FontAwesomeIcon
                            icon={['fas', icon]}
                            size='4x'
                        />
                        <Text 
                            mt='16px' 
                            fontSize='2rem'
                            fontWeight={500}
                            as='span'
                        >
                            {headline}
                        </Text>
                        <Text
                            mt='6px'
                            fontSize='1.5rem'
                            fontWeight={500}
                            as='span'
                            textAlign='center'
                        >
                            {subheadline}
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variantColor='blue'
                        onClick={onClose}
                        mr='22px'
                    >
                        Play again!
                    </Button>
                    <Link
                        isExternal
                        href='https://aureliendupaysdexemple.com/'
                    >
                        <Button 
                            variantColor='blue'
                            variant='link'
                        >
                            Say hi! 🖐
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}