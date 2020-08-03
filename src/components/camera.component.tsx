import * as React from 'react';

export type CameraProps = {
    isVideoPlaying?: boolean;
    onCanPlay: () => void;
};

export const Camera = React.forwardRef((props: CameraProps, ref: React.Ref<HTMLVideoElement>) => {
    const {
        onCanPlay
    } = props;

    return (
        <video
            ref={ref}
            width={640}
            height={480}
            onCanPlay={onCanPlay}
            autoPlay
            muted
            playsInline
        />
    );
});