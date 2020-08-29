import React, {useState} from 'react';
import { Switch, Route, withRouter } from 'react-router';
import cx from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';

import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
import NotFound from '../../pages/notFound/NotFound';

function Layout (props) {
  const functionName = 'Layout';
  return (
      <div className="Layout">
        <Header/>
        <main role="main">
          <Switch>
            <Route path="/mapper" exact component={Mapper} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
  );
}

export default withRouter(Layout);