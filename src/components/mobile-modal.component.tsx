import * as React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
} from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type MobileModalProps = {
    open?: boolean;
}

export function MobileModal({ open }: MobileModalProps) {
    return (
        <Modal isOpen={open}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} size='1x' /> No mobile device support
                </ModalHeader>
                <ModalBody>
                    <Text fontSize='md'>
                        This webapp is made only for desktops. <br />
                        This is made on purpose to provide you the best experience as you can get.<br />
                        Thanks a lot 🙏 for your understanding.
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}