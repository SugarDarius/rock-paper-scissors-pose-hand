import { useMedia } from 'react-use';

export type UsePrefersColorSchemeReturnType = 'light' | 'dark';

export function usePrefersColorScheme(): UsePrefersColorSchemeReturnType {
    const isDarkMode = useMedia('(prefers-color-scheme: dark)', false);

    return isDarkMode ? 'dark' : 'light';
}