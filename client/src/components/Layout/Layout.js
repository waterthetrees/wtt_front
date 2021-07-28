import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
// import Loading from './Loading';
import About from '../../pages/about/About';
import Privacy from '../../pages/privacy/Privacy';
import License from '../../pages/license/License';
import UserProfile from '../../pages/userprofile/UserProfile';
import Contact from '../../pages/contact/Contact';
import Data from '../../pages/data/Data';
import NotFound from '../../pages/notFound/NotFound';

// const Contact = lazy(() => import('../../pages/contact/Contact'));
// const About = lazy(() => import('../../pages/about/About'));
// const Privacy = lazy(() => import('../../pages/privacy/Privacy'));
// const License = lazy(() => import('../../pages/license/License'));
// const UserProfile = lazy(() => import('../../pages/userprofile/UserProfile'));
// const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

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
          <Route path="/contact" exact component={Contact} />
          <Route path="/data" exact component={Data} />
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </div>
  );
}

export default withRouter(Layout);
