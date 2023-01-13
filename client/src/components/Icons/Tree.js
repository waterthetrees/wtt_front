import React from 'react';
import TreeImage from '@/assets/images/addtree/treefattrunk.png';
import { ForestOutlined, YardOutlined } from '@mui/icons-material';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TreeLogo = () => {
  const StyledLogo = styled(CardMedia)({
    width: '32px',
    aspectRatio: '1/1',
  });

  return <StyledLogo component="img" src={TreeImage} alt="tree"></StyledLogo>;
};

export const TreeIcon = (props) => (
  <ForestOutlined sx={{ fontSize: '2rem' }} {...props} />
);

export const PlantIcon = (props) => (
  <YardOutlined sx={{ fontSize: '2rem' }} {...props} />
);
