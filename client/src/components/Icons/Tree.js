import React from 'react';
import TreeImage from '@/assets/images/addtree/treefattrunk.png';

import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TreeLogo = () => {
  const StyledLogo = styled(CardMedia)({
    width: '48px',
    aspectRatio: '1/1',
    '@media(max-width: 768px)': {
      width: '32px',
      // width: '90%',
      // display: 'flex',
    },
  });

  return <StyledLogo component="img" src={TreeImage} alt="tree"></StyledLogo>;
};
