/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import NotFound from '../pages/notFound/NotFound';

// const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));

const App = () => (
  <Switch>
    <Route component={Layout} />
    <Route component={NotFound} />
  </Switch>
);

export default withRouter(App);
