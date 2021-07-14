import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Footer from '../../components/Footer/Footer';

export default function NotFound() {
  return (
    <Grid container spacing={2} justify="center" alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h1">
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
