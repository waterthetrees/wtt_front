import React from 'react';

import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SlackLogo = () => {
  const StyledLogo = styled(CardMedia)({
    height: '64px',
    aspectRatio: '1/1',
  });

  return (
    <StyledLogo
      component="img"
      src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/01/Slack-New.jpg"
      alt="tree"
    ></StyledLogo>
  );
};

export const GithubLogo = () => {
  const StyledLogo = styled(CardMedia)({
    height: '64px',
    aspectRatio: '1/1',
  });

  return (
    <StyledLogo
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
      alt="tree"
    ></StyledLogo>
  );
};

export const FigmaLogo = () => {
  const StyledLogo = styled(CardMedia)({
    height: '64px',
    aspectRatio: '1/1',
    objectFit: 'fill',
  });

  return (
    <StyledLogo
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
      alt="tree"
    ></StyledLogo>
  );
};
