import React from 'react';
import { Box, Button, styled } from '@mui/material';
import TrackingToggle from './TrackingToggle';
import { PlantTarget } from './PlantTarget';

const circleSize = 70;

const Container = styled(Box)`
  text-align: center;
  position: relative;
`;

const OuterCircle = styled('div')(({ theme }) => `
  width: ${circleSize}px;
  height: ${circleSize}px;
  border: 4px solid ${theme.palette.primary.main};
  border-radius: 50%;

  // As soon as the cursor hits the OuterCircle border, we want the InnerCircle color to change.
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
`);

const Target = styled(PlantTarget)(({ theme }) => `
  width: 24px;
  height: 24px;
  color: ${theme.palette.primary.main};
`);

export default function Marker({ tracking, onPlantClick, onTrackingChange }) {
  return (
    <Container>
      <OuterCircle>
        <InnerCircle>
          <Target />
        </InnerCircle>
      </OuterCircle>
      <TrackingToggle
        checked={tracking}
        onChange={onTrackingChange}
      />
      <Button
        title="Enter the details for the new tree"
        variant="contained"
        disableElevation
        onClick={onPlantClick}
        sx={{ mt: 1, minWidth: 0, px: 1 }}
      >
        Plant
      </Button>
    </Container>
  );
}
