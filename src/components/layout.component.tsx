import * as React from 'react';
import { 
    ThemeProvider, 
    ColorModeProvider,
    CSSReset,
    theme,
} from "@chakra-ui/core";

import '../icons/library';
import { usePrefersColorScheme } from '../hooks';

export function Layout({ children }) {
    const prefersColorScheme = usePrefersColorScheme();
    
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <ColorModeProvider value={prefersColorScheme}>
                {children}
            </ColorModeProvider>
        </ThemeProvider>
    );
}