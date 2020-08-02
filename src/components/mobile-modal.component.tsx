import * as React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    useDisclosure,
} from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMobileDetection } from '../hooks';

export function MobileModal() {
    const isMobile = useMobileDetection();
    
    return (
        <Modal isOpen={isMobile}>
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