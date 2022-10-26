import React from 'react';
import { Box } from '@mui/material';

export default function Section({ children, sx }) {
  return (
    <Box sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', ...sx }}>
      {children}
    </Box>
  );
}
