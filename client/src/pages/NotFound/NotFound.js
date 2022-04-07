import React from 'react';
import { Grid, Typography } from '@mui/material';
import Footer from '@/components/Footer/Footer';

export default function NotFound() {
  return (
    <Grid container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <Typography variant="h1"
          sx={{ my: 2 }}
        >
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          Sorry, the page you were trying to view does not exist.
        </Typography>
      </Grid>
      <Footer />
    </Grid>
  );
}
