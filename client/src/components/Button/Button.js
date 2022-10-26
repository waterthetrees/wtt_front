import React from 'react';
import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';

export const GreenButton = (props) => {
  const Green = styled(Button)({
    backgroundColor: '#147d16',
    borderRadius: '.3vw',
    color: 'white',
    height: '32px',
  });

  return (
    <Green type={props.type} sx={props?.sx} onClick={props.onClick}>
      {props.children}
    </Green>
  );
};

export const WhiteButton = (props) => {
  const White = styled(Button)({
    backgroundColor: 'white',
    border: '1px #147d16 solid',
    borderRadius: '.3vw',
    color: '#00000050',
    height: '32px',
  });

  return (
    <White type={props.type} onClick={props.onClick} sx={props?.sx}>
      {props.children}
    </White>
  );
};

export const GrayButton = (props) => {
  const Gray = styled(Button)({
    backgroundColor: 'white',
    borderRadius: '.3vw',
    border: '1px solid #00000050',
    color: '#00000050',
    height: '32px',
  });

  return (
    <Gray type={props.type} onClick={props.onClick} sx={props?.sx}>
      {props.children}
    </Gray>
  );
};
