import React from 'react';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SlackLogo = (props) => {
  console.log(props.sx);
  const StyledLogo = styled(CardMedia)({
    ...props.sx,
    '&:hover': { cursor: 'pointer' },
  });

  return (
    <StyledLogo
      component="img"
      src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/01/Slack-New.jpg"
      alt="tree"
    ></StyledLogo>
  );
};

export const GithubLogo = (props) => {
  const StyledLogo = styled(CardMedia)({
    ...props.sx,
    '&:hover': { cursor: 'pointer' },
  });

  return (
    <StyledLogo
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
      alt="tree"
    ></StyledLogo>
  );
};

export const FigmaLogo = (props) => {
  const StyledLogo = styled(CardMedia)({
    ...props.sx,
    '&:hover': { cursor: 'pointer' },
  });

  return (
    <StyledLogo
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
      alt="tree"
    ></StyledLogo>
  );
};

export const LinkedinLogo = (props) => {
  const StyledLogo = styled(CardMedia)({
    ...props.sx,
    '&:hover': { cursor: 'pointer' },
  });
  return (
    <StyledLogo
      component="img"
      src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
      alt="linkedin"
    ></StyledLogo>
  );
};
