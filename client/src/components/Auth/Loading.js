/* eslint-disable react/jsx-first-prop-new-line */
import React from 'react';
import { Fade, Grid, Typography } from '@mui/material';
import Footer from '@/components/Footer/Footer';
import treeIcon from '@/assets/images/addtree/tree16.svg';

// Wrap the loading text and image in a fade transition so that it doesn't appear and then get
// immediately replaced with the lazy-loaded component, which can cause a noticeable flicker.
export const Loading = () => (
  <Fade in
    timeout={1500}
    easing="cubic-bezier(0.7, 0, 0.84, 0)"
  >
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <img
          src={treeIcon}
          alt="Loading..."
          style={{ height: '100px' }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Grid>
      <Footer />
    </Grid>
  </Fade>
);

// export default Loading;
