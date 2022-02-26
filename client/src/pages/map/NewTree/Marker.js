import React from 'react';
import { Box, styled } from '@mui/material';
import { Crosshairs } from './Crosshairs';
import { AddButton, TrackingToggle } from './MarkerButtons';
import { TooltipBottom, TooltipTop } from '@/components/Tooltip';

const circleSize = 70;

const Container = styled(Box)`
  text-align: center;
`;

const OuterCircle = styled('div')(({ theme }) => `
  width: ${circleSize}px;
  height: ${circleSize}px;
  border: 4px solid ${theme.palette.primary.main};
  border-radius: 50%;

  // As soon as the cursor hits the OuterCircle border, we want the InnerCircle color to change.
  // The 44 at the end is a hex alpha value to make the color translucent.
  &:hover > div {
    border-color: ${theme.palette.primary.main}44;
  }

  &:active > div {
    border-color: ${theme.palette.primary.main}66;
  }
`);

const InnerCircle = styled('div')(({ theme }) => `
  width: 100%;
  height: 100%;
  border: 20px solid ${theme.palette.primary.main}22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`);

const Target = styled(Crosshairs)(({ theme }) => `
  width: 35px;
  height: 35px;
  color: ${theme.palette.primary.main};
`);

const Toolbar = styled(Box)`
  width: 100%;
  margin-top: .5rem;
  display: flex;
  justify-content: space-between;
`;

export default function Marker({ tracking, onPlantClick, onTrackingChange }) {
  return (
    <Container>
      <TooltipTop title="Drag to the location for the new tree">
        <OuterCircle>
          <InnerCircle>
            <Target />
          </InnerCircle>
        </OuterCircle>
      </TooltipTop>
      <Toolbar>
        <TooltipBottom
          title="Enter the details for the new tree"
        >
          <AddButton
            onClick={onPlantClick}
          />
        </TooltipBottom>
        <TooltipBottom
          title={tracking
            ? 'Stop tracking your current location'
            : 'Make the planting marker follow your current location'}
        >
          <TrackingToggle
            checked={tracking}
            onChange={onTrackingChange}
          />
        </TooltipBottom>
      </Toolbar>
    </Container>
  );
}
