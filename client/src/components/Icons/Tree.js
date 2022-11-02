import React from 'react';
import TreeImage from '@/assets/images/addtree/treefattrunk.png';

import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TreeLogo = () => {
  const StyledLogo = styled(CardMedia)({
    width: '64px',
    aspectRatio: '1/1',
  });

  return <StyledLogo component="img" src={TreeImage} alt="tree"></StyledLogo>;
};
