import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React from 'react';

const AdoptionInfoIconButton = ({ adoptionDirections, children, ...props }) => {
  const StyledIconButton = styled(IconButton)({
    padding: '9px',
    '&:hover': {
      backgroundColor: 'rgba(208, 64, 58, 0.06)',
    },
    color: adoptionDirections ? '#d0403a' : '',
  });

  return (
    <StyledIconButton {...props}>
      {children}
    </StyledIconButton>
  );
};

export default AdoptionInfoIconButton;
