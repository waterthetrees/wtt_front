import React, { useState } from 'react';
import { Button, styled } from '@mui/material';
import { Drop } from '@/components/Icons';
import TreeAdoptionDirections from './AdoptionDirections';

const Label = styled('div')`
  color: white;
  font-size: .9rem;
  font-weight: bold;
  width: 100%;
  left: 0;
  top: 42%;
  position: absolute;
  display: inline-block;
`;
const BackgroundIcon = styled(Drop)`
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  position: absolute;
  transform: scaleX(1.1);
`;

export default function Adopt() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        sx={{
          width: '5rem !important',
          height: '5rem !important',
          position: 'relative',
        }}
        onClick={() => setOpen(true)}
      >
        <BackgroundIcon fill="#337ab7" />
        <Label>ADOPT</Label>
      </Button>
      {open && (
        <TreeAdoptionDirections
          onmap
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
