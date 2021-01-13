/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import {
  Switch, Route, withRouter,
} from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
// import { useAuth0 } from '@auth0/auth0-react';
import Layout from './Layout/Layout';
import NotFound from '../pages/notFound/NotFound';
// const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));

const queryConfig = {
  shared: {
    suspense: true,
  },
  queries: {
    refetchOnWindowFocus: true,
  },
};
let renderCount = 0;
const App = () => {
  const componentName = 'App';

  renderCount += 1;

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Switch>
        <Route component={Layout} />
        <Route component={NotFound} />
      </Switch>
    </ReactQueryConfigProvider>
  );
};

export default withRouter(App);
