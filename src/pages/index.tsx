import * as React from 'react';
import { 
    Flex,
    Box,
    Heading,
    Text,
    Link,
    Tooltip,
    IconButton,
    DarkMode,
    LightMode,
    useColorMode,
} from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
	Layout,
	Meta,
} from '../components';
import { useSite } from '../hooks';

export default function IndexPage(): React.ReactElement {
    const site = useSite();
	const { colorMode, toggleColorMode } = useColorMode();

	const [isDarkMode, setDarkState] = React.useState<boolean>(false);

	React.useEffect(() => {
		setDarkState(colorMode === 'dark');
	}, [colorMode]);

	// gatsby build issue workaround with chakra-ui
	const WrapperColorSchemeMode = isDarkMode ? DarkMode : LightMode;
    const iconDarkModeBaseColor = '#ffffff';
    
    return (
        <Layout>
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
                    <Heading as='h1' fontWeight={400}>
                        Rock Paper Scissors Pose Hand 👋
                    </Heading>
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
                        Developed with ❤ by <Link isExternal href='https://github.com/SugarDarius'>SugarDarius</Link><br />
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
                    <WrapperColorSchemeMode>
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
                    </WrapperColorSchemeMode>
				</Box>
            </Flex>
        </Layout>
    );
}