import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
import About from '../../pages/about/About';
import Privacy from '../../pages/privacy/Privacy';
import License from '../../pages/license/License';
import UserProfile from '../../pages/userprofile/UserProfile';
import Contact from '../../pages/contact/Contact';
import Data from '../../pages/data/Data';
import NotFound from '../../pages/notFound/NotFound';
import ProtectedRoute from '../../auth/protected-route';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="layout">
      <Header />
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" exact component={Mapper} />
          <Route path="/treemap" exact component={Mapper} />
          <ProtectedRoute path="/userprofile" exact component={UserProfile} />
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
