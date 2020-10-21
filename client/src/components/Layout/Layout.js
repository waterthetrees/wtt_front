import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import cx from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';

const Header = React.lazy(() => import('../Header'));
const Footer = React.lazy(() => import('../Footer'));
const Mapper = React.lazy(() => import('../../pages/mapper/Mapper'));
const AddTree = React.lazy(() => import('../../pages/addtree/AddTree'));
const About = React.lazy(() => import('../../pages/about/About'));
const NotFound = React.lazy(() => import('../../pages/notFound/NotFound'));

function Layout(props) {
  const functionName = 'Layout';
  return (
    <div className="Layout">
      <Header />
      <Switch>
        <Route path="/" exact component={Mapper} />
        <Route path="/addtree" exact component={AddTree} />
        <Route path="/about" exact component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);
