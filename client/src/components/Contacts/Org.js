import React from 'react';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

import CodeLogo from '@/assets/images/logos/c4sf-logo.jpg';
import SierrClubLogo from '@/assets/images/logos/san-francisco-bay.png';

const StyledImg = styled(CardMedia)({
  maxHeight: '20vh',
  width: '100%',
});

export const C4SF = () => {
  return (
    <a
      href="https://www.codeforsanfrancisco.org/"
      rel="noreferrer"
      target="_blank"
      style={{ width: '100%', display: 'inline-block' }}
    >
      <StyledImg component="img" alt="Code for America Logo" src={CodeLogo} />
    </a>
  );
};

export const Sierra = () => {
  return (
    <a
      href="https://www.sierraclub.org/san-francisco-bay/tree-planting"
      rel="noreferrer"
      target="_blank"
    >
      <StyledImg component="img" alt="Sierra Club Logo" src={SierrClubLogo} />
    </a>
  );
};
