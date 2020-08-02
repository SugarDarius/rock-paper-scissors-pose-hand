import * as React from 'react';

export function useMobileDetection(): boolean {
    const [ isMobile, setIsMobile ] = React.useState<boolean>(false);

    React.useEffect(() => {
        const isAndroid: boolean = /Android/i.test(navigator.userAgent);
        const isiOS: boolean = /iP(hone|ad|od)/i.test(navigator.userAgent);

        setIsMobile(isAndroid || isiOS);
    }, []);

    return isMobile;
}