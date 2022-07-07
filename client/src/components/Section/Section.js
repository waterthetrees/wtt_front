import React from 'react';
import { Box } from '@mui/material';

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
