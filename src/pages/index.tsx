import * as React from 'react';

import { 
    Flex,
    Box,
    Text,
    Link,
    Tooltip,
    IconButton,
    Stack,
    DarkMode,
    LightMode,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
	Layout,
    Meta,
    MobileModal,
    GreetingsModal,
    Game,
} from '../components';

import { 
    useSite,
    useMobileDetection, 
} from '../hooks';

export default function IndexPage(): React.ReactElement {
    const site = useSite();
    const isMobile = useMobileDetection(true);

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onClose } = useDisclosure(!isMobile);

	const [isDarkMode, setDarkState] = React.useState<boolean>();

	React.useEffect(() => {
		setDarkState(colorMode === 'dark');
    }, [colorMode]);

	// gatsby build issue workaround with chakra-ui
	const WrapperColorSchemeMode = isDarkMode ? DarkMode : LightMode;
    
    return (
        <Layout>
            <WrapperColorSchemeMode>
                <Meta
                    title='Play!'
                    titleTemplate={site.siteMetadata.title}
                    description={site.siteMetadata.description}
                />
                <Flex
                    position='relative'
                    direction='column'
                    width='100vw'
                    height='100vh'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Flex
                        position='relative'
                        direction='column'
                        width='100%'
                        height='auto'
                        padding='24px'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing='1.550rem'
                        >
                            <Box width='auto'>
                                <FontAwesomeIcon icon={['fas', 'hand-rock']} size='2x' />
                            </Box>
                            <Box width='auto'>
                                <FontAwesomeIcon icon={['fas', 'hand-paper']} size='2x' />
                            </Box>
                            <Box width='auto'>
                                <FontAwesomeIcon icon={['fas', 'hand-scissors']} size='2x' />
                            </Box>
                        </Stack>
                    </Flex>
                    <Flex
                        position='relative'
                        direction='column'
                        width='100%'
                        height='auto'
                        flex='1'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {
                            !isMobile ? (
                                <Game disable={isOpen} />
                            ) : null
                        }
                    </Flex>
                    <Flex
                        position='relative'
                        direction='column'
                        width='100%'
                        height='auto'
                        padding='24px'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Text fontSize='md' textAlign='center'>
                            Made with ❤ by <Link isExternal href='https://github.com/SugarDarius'>SugarDarius</Link> © 2020<br />
                            You can check the code <FontAwesomeIcon icon={['fas', 'code']} size='1x' /> on <Link isExternal href='https://github.com/SugarDarius/rock-paper-scissors-pose-hand'>GitHub <FontAwesomeIcon icon={['fab', 'github']} size='1x' /></Link>
                        </Text>
                    </Flex>
                    <Box
                        position='absolute'
                        bottom='1.25rem'
                        right='1.25rem'
                        width='auto'
                        height='auto'
                    >
                        <Tooltip
                            hasArrow
                            label={`Use ${isDarkMode ? 'light' : 'dark'} mode`}
                            placement='left'
                            aria-label={`Use ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            <IconButton
                                icon={isDarkMode ? 'sun' : 'moon'}
                                onClick={toggleColorMode}
                                aria-label='Toggle Color Scheme mode button'
                                isRound
                            />
                        </Tooltip>
                    </Box>
                </Flex>
                {
                    !isMobile ? (
                        <GreetingsModal
                            open={isOpen}
                            onClose={onClose}
                        />
                    ) : null
                }
                <MobileModal open={isMobile} />
            </WrapperColorSchemeMode>
        </Layout>
    );
}