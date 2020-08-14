import * as React from 'react';

export type UseUserMediaReturnType = {
    mediaStream: MediaStream | null;
    getMediaStream: () => void;
};

export function useUserMedia(mediaStreamConstraints: MediaStreamConstraints): UseUserMediaReturnType {
    const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

    const getMediaStream = React.useCallback(() => {
        if (!mediaStream) {
            navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
                .then((stream: MediaStream) => {
                    setMediaStream(stream);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [mediaStream]);

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

    return {
        mediaStream,
        getMediaStream,
    };
}