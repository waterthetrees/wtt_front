import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

export default function Section({ children, title }) {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 4,
        '&:last-child': {
          mb: 2,
        },
      }}
    >
      <h3>{title}</h3>
      {children}
    </Box>
  );
}

export const GreenButton = styled.button((props) => ({
  background: '#3fab45',
  color: 'white',
  fontSize: '1.75rem',
  border: 'none',
  borderRadius: '.5rem',
  padding: '4px',
  ...props.style,
}));
