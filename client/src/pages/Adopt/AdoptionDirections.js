import React from 'react';
import { Box, styled } from '@mui/material';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';

const Container = styled(Box)`
  font-size: 1.25rem;
  padding: 2rem;

  h4 {
    margin: 2rem 0 0.25rem 0;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 1.15rem;
    padding: 1rem;
  }
`;

export default function AdoptionDirections({ onmap, open, onClose }) {
  return (
    <ScrollableDialog
      title="Adopt a Tree"
      open={open}
      actions={[{ cancel: 'OK' }]}
      onClose={onClose}
    >
      <Container>
        <h3>ADOPT a TREE!</h3>

        {onmap && (
          <>
            <h4>How to</h4>
            <ol>
              <li>Login on the main menu.</li>
              <li>Select a tree on the map.</li>
              <li>Check the adopt checkbox in the tree info window.</li>
            </ol>
          </>
        )}

        <h4>Location</h4>
        <p>
          It will be easiest to do watering if you live closer than one block
          away from this tree.
        </p>

        <h4>Water Needs</h4>
        <p>
          Young street trees usually need 10-20 gallons of water every 2-3 weeks
          in the summer for the first 2-3 years. If it gets really hot, please
          water more!
        </p>

        <h4>Mulch Needs</h4>
        <p>
          Mulch the tree once a year before summer hits or as necessary. Mulch
          helps the tree retain moisture.
        </p>

        <h4>Maintenance</h4>
        <p>Please add to the maintenance history when you water the tree.</p>
      </Container>
    </ScrollableDialog>
  );
}
