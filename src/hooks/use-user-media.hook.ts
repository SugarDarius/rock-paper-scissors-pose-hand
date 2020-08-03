import * as React from 'react';

export function useUserMedia(requestMedia: MediaStreamConstraints): MediaStream | null {
    const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

    React.useEffect(() => {
        const enableMediaStream = async (): Promise<void> => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(requestMedia);
                setMediaStream(stream);
            }
            catch (error) {
                console.error(error);
            }
        };

        if (!mediaStream) {
            enableMediaStream();
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                });
            }
        };
    }, [mediaStream, requestMedia]);

    return mediaStream;
}