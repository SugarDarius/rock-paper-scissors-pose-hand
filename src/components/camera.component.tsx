import * as React from 'react';
import styled from '@emotion/styled'

export type CameraProps = {
    isVideoPlaying?: boolean;
    width: number;
    height: number;
    onCanPlay: () => void;
};

export const Video = styled.video`
    &::-webkit-media-controls-play-button {
        display: none !important;
        -webkit-appearance: none;
    }
`;

export const Camera = React.forwardRef((props: CameraProps, ref: React.Ref<HTMLVideoElement>) => {
    const {
        isVideoPlaying,
        width,
        height,
        onCanPlay
    } = props;

    return (
        <Video
            ref={ref}
            hidden={!isVideoPlaying}
            width={width}
            height={height}
            onCanPlay={onCanPlay}
            autoPlay
            muted
            playsInline
        />
    );
});