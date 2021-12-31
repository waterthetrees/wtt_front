import React from 'react';
import { Grid, Typography } from '@mui/material';
import Footer from '../Footer';

const Loading = () => (
  <Grid container
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{ height: '100vh' }}
  >
    <Grid item>
      <img src='assets/images/addtree/tree16.svg'
        alt="Loading..."
        style={{ width: '100px' }}
      />
    </Grid>
    <Grid item>
      <Typography variant="h3" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Grid>
    <Footer />
  </Grid>
);

export default Loading;
