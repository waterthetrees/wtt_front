import React, { useState, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { ReactQueryConfigProvider } from "react-query";
import LayoutComponent from "../components/Layout/Layout";
import NotFoundComponent from "../pages/notFound/NotFound";
// import 'mapbox-gl/dist/mapbox-gl.css';


const PrivateRoute = ({ component, isAuthenticated, email, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Loader = () => <div>Loading</div>;

const queryConfig = {
    shared: {
      suspense: true
    },
    queries: {
      refetchOnWindowFocus: true
    },


};

const App = (props) => {
  const component_name = "App!!!!\n\n\n";
  // const email = useSelector(state => state.auth.email);
  const email = "testrose@gamma.com";
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAuthenticated = true;
  // return (
  //   <SWRConfig
  //     value={{
  //       fetcher: getData,
  //     }}
  //   >
  //     <Suspense fallback={<Loader />}>
  //     <Switch>
  //       <Route path="/" exact render={() => <Redirect to="/mapper" />} />
  //       <PrivateRoute
  //         isAuthenticated={isAuthenticated}
  //         email={email}
  //         path="/"
  //         component={LayoutComponent}
  //       />
  //       <Route component={NotFoundComponent} />
  //     </Switch>
  //     </Suspense>
  //   </SWRConfig>
  // );

  return (    
    <ReactQueryConfigProvider config={queryConfig}>
      <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/mapper" />} />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          email={email}
          path="/"
          component={LayoutComponent}
        />
        <Route component={NotFoundComponent} />
      </Switch>
      </Suspense>
    </ReactQueryConfigProvider>
  );
};

export default withRouter(App);
