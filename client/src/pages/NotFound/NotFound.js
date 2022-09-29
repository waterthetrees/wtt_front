import React from 'react';
import { Grid, Typography, Button, Container } from '@mui/material';
import { Footer } from '@/components/Footer/Footer';
import './NotFound.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="background-overlay"></div>
      <Container>
        <Grid
          container
          justifyContent={{ md: 'center', sm: 'flex-start' }}
          alignItems="flex-start"
          direction="column"
          sx={{ height: '100vh' }}
        >
          <Grid item>
            <Typography variant="h1">404</Typography>
          </Grid>
          <Grid item sx={{ mb: 5 }}>
            <Typography paragraph>
              Sorry, we can&apos;t find that page! Don&apos;t worry though,
              there are still plenty of trees to water!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                backgroundColor: 'black',
                border: '2px solid white',
                fontSize: '1.5rem',
                fontWeight: '800',
              }}
            >
              <Link to="/">water the trees</Link>
            </Button>
          </Grid>
          <Footer />
        </Grid>
        <Footer />
      </Container>
    </div>
  );
}
