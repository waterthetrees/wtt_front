/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './Layout/Layout';
import NotFound from '../pages/notFound/NotFound';
import '../styles/app.scss';

// const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));

// Create a default theme.
const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route component={Layout} />
      <Route component={NotFound} />
    </Switch>
  </ThemeProvider>
);

export default withRouter(App);
