import React from 'react';
import { Link, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

import CodeLogo from '@/assets/images/logos/c4sf-logo.jpg';
import SierrClubLogo from '@/assets/images/logos/san-francisco-bay.png';

const StyledLinks = styled(Link)({
  maxWidth: '20vw',
  maxHeight: '20vh',
  margin: '1rem',
});

const StyledImg = styled(CardMedia)({
  maxHeight: '20vh',
  margin: '1rem',
});

export const C4SF = () => {
  return (
    <a
      href="https://www.codeforsanfrancisco.org/"
      rel="noreferrer"
      target="_blank"
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
