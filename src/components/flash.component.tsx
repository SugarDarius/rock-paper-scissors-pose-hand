import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export type FlashProps = {
    flash?: boolean;
};

export const flashAnimation = keyframes`
    0% { opacity: 0.75; }
    100% { opacity: 0; }
`;

export const Flash = styled.div<FlashProps>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    opacity: 0;
    background-color: #ffffff;

    ${({ flash }) => {
        if (flash) {
            return css`
                animation: ${flashAnimation} 750ms ease-out;
            `;
        }
    }}
`;