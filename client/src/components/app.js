/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import Layout from './Layout/Layout';

const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));

const PrivateRoute = ({
  component, isAuthenticated, map, email, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{ pathname: '/login', state: { from: props.location } }}
      />
    ))}
  />
);

const Loader = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      alignItems: 'left',
      color: 'green',
      fontSize: '24px',
      margin: '10px',
      fontStyle: 'italic',
    }}
  >
    Water the Trees
  </div>
);

const queryConfig = {
  shared: {
    suspense: true,
  },
  queries: {
    refetchOnWindowFocus: true,
  },
};

const App = (props) => {
  const component_name = 'App!!!!\n\n\n';
  const email = 'rose@waterthetrees.com';
  // const { isAuthenticated } = useAuth0();
  const isAuthenticated = true;

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            email={email}
            path="/"
            component={Layout}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ReactQueryConfigProvider>
  );
};

export default withRouter(App);
