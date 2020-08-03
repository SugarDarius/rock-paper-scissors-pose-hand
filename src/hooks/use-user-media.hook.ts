import * as React from 'react';

export function useUserMedia(mediaStreamConstraints: MediaStreamConstraints): MediaStream | null {
    const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

    React.useEffect(() => {
        if (!mediaStream) {
            navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
                .then((stream: MediaStream) => {
                    setMediaStream(stream);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        
    }, [mediaStream, mediaStreamConstraints]);

    React.useEffect(() => {
        return () => {
            if (!!mediaStream) {
                mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                    mediaStream.removeTrack(track);
                });
            }
        };
    }, [mediaStream]);

    return mediaStream;
}