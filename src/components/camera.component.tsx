import * as React from 'react';

import { 
    useUserMedia
} from '../hooks';

export function Camera() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const mediaStream = useUserMedia({
        audio: false,
        video: { 
            facingMode: 'user',
        }
    });

    if (!!mediaStream && !!videoRef.current &&  !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    const onCanPlay = () => {
        videoRef.current.play();
    };

    return (
        <video
            ref={videoRef}
            width={640}
            height={500}
            onCanPlay={onCanPlay}
            autoPlay
            muted
            playsInline
        />
    );
}