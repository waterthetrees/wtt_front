import React from 'react';
import styled from '@emotion/styled';

export const GreenButton = styled.button((props) => ({
  background: '#3fab45',
  color: 'white',
  fontSize: '1.75rem',
  border: 'none',
  borderRadius: '.5rem',
  ...props.styles,
}));

export default GreenButton;
