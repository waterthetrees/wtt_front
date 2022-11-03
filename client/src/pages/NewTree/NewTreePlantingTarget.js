/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { styled } from '@mui/material';
import AddTreeIcon from '@/assets/images/addtree/addatreeface.svg';

export const targetSize = 70;
const outerBorderWidth = 2;
const targetBorderWidth = 4;
const markerFullSize = targetSize + 2 * outerBorderWidth;
const markerBaseColor = '#000000';
const followingColor = '#1da1f2';

const OuterCircle = styled('div')`
  &,
  &::before {
    width: ${targetSize}px;
    height: ${targetSize}px;
    border-width: ${targetBorderWidth}px;
    border-style: solid;
    border-radius: 50%;
  }

  // As soon as the cursor hits the OuterCircle border, we want the InnerCircle color to change.
  // The 44 at the end is a hex alpha value to make the color translucent.
  &:hover > div {
    border-color: ${markerBaseColor}44;
  }

  &:active > div {
    border-color: ${markerBaseColor}66;
  }

  &::before {
    border-color: ${followingColor};
    content: '';
    left: 0;
    top: 0;
    position: absolute;
    animation: pulseAnimation 2s infinite;
  }

  &::after {
    content: '';
    width: ${markerFullSize}px;
    height: ${markerFullSize}px;
    border: ${outerBorderWidth}px solid white;
    border-radius: 50%;
    left: ${-outerBorderWidth}px;
    top: ${-outerBorderWidth}px;
    position: absolute;
    box-shadow: 0 0 3px rgb(0 0 0 / 35%);
  }

  @keyframes pulseAnimation {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    70% {
      transform: scale(1.5);
      border-width: ${3 * targetBorderWidth}px;
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const InnerCircle = styled('div')`
  width: 100%;
  height: 100%;
  border: 20px solid ${markerBaseColor}22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const AddTreeFaceSrc = styled('img')`
  width: ${targetSize}px;
  height: ${targetSize}px;
  color: black;
`;

// To put a tooltip on this component, we have to both forward the ref and spread the props on it.
export const NewTreePlantingTarget = forwardRef(
  ({ isFollowingUser, ...props }, ref) => (
    <OuterCircle
      ref={ref}
      sx={{
        // The isFollowingUser prop could be passed into the styled() call above, but it's a little
        // simpler to add this styling via the sx prop.
        borderColor: `${
          isFollowingUser ? followingColor : `${markerBaseColor}99`
        }`,
        '&::before': {
          display: isFollowingUser ? 'block' : 'none',
        },
      }}
      {...props}
    >
      <InnerCircle>
        <AddTreeFaceSrc src={AddTreeIcon} />
      </InnerCircle>
    </OuterCircle>
  ),
);
