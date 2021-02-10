/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
// import { ReactQueryConfigProvider } from 'react-query';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from './Layout/Layout';

const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));

const Loading = () => (
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

// const queryConfig = {
//   shared: {
//     suspense: true,
//   },
//   queries: {
//     refetchOnWindowFocus: true,
//   },
// };
const queryClient = new QueryClient();

const App = () => {
  const componentName = 'App';
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <QueryClientProvider client={queryClient}>

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route component={Layout} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </QueryClientProvider>
  );
};

export default withRouter(App);
