import React, { lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
import About from '../../pages/about/About';
// import About from '../../pages/about/About';
import Privacy from '../../pages/privacy/Privacy';
import License from '../../pages/license/License';
import UserProfile from '../../pages/userprofile/UserProfile';
// const Header = lazy(() => import('../Header'));
// const Terms = lazy(() => import('../../pages/terms/Terms'));
// const Privacy = lazy(() => import('../../pages/privacy/Privacy'));
const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="layout">
      <Header />

      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" exact component={Mapper} />
          <Route path="/treemap" exact component={Mapper} />

          <Route path="/userprofile" exact component={UserProfile} />
          <Route path="/about" exact component={About} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/license" exact component={License} />
          <Route component={NotFound} />
        </Switch>

      </QueryClientProvider>

    </div>
  );
}

export default withRouter(Layout);
