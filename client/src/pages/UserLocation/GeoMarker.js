import { styled } from '@mui/material';
import React from 'react';

import MapboxMarkerPortal from '@/pages/Map/MapboxMarkerPortal';

const markerOptions = {
  anchor: 'center',
};
const dotSize = 15;
const borderWidth = 2;

const MarkerDot = styled('div')`
  &,
  &::before {
    width: ${dotSize}px;
    height: ${dotSize}px;
    background-color: #1da1f2;
    border-radius: 50%;
  }

  &::before {
    content: '';
    position: absolute;
    animation: dotPulseAnimation 2s infinite;
  }

  &::after {
    content: '';
    top: -${borderWidth}px;
    left: -${borderWidth}px;
    width: ${dotSize + 2 * borderWidth}px;
    height: ${dotSize + 2 * borderWidth}px;
    border: ${borderWidth}px solid white;
    border-radius: 50%;
    box-shadow: 0 0 3px rgb(0 0 0 / 35%);
    position: absolute;
  }

  @keyframes dotPulseAnimation {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    70% {
      transform: scale(3);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export default function GeoMarker({ visible, coordinates }) {
  return (
    <MapboxMarkerPortal
      visible={visible}
      coordinates={coordinates}
      options={markerOptions}
    >
      <MarkerDot />
    </MapboxMarkerPortal>
  );
}
