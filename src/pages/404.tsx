import * as React from 'react';
import { Link } from 'gatsby';
import { 
	Flex, 
	Link as CLink, 
	Button, 
	DarkMode,
	LightMode,
	useColorMode
} from '@chakra-ui/core';

import { 
	Layout,
	Meta
} from '../components';

export default function NotFoundPage(): React.ReactElement {
	const { colorMode } = useColorMode();
	const [isDarkMode, setDarkState] = React.useState<boolean>(false);
	React.useEffect(() => {
		setDarkState(colorMode === 'dark');
	}, [colorMode]);

	// gatsby build issue workaround with chakra-ui
	const WrapperColorSchemeMode = isDarkMode ? DarkMode : LightMode;

	return (
    	<Layout>
			<Meta title='404!' />
			<Flex
				position='relative'
				direction='column'
				width='100vw'
				height='100vh'
				alignItems='center'
				justifyContent='center'
			>
				<img
					src='/images/not-found-illu.png'
					alt='404 Not Found illustration'
					width='75%'
					style={{ objectFit: 'cover' }}
				/>
				<CLink
					// @ts-ignore
					as={Link} 
					to='/' 
					mt='1rem'
					style={{ textDecoration: 'none' }}
				>
					<WrapperColorSchemeMode>
						<Button>
							Go to the home page!
						</Button>
					</WrapperColorSchemeMode>
				</CLink>
			</Flex>
		</Layout>
	);
}