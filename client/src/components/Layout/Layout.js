import React, { useState, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import cx from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';

// const Header = lazy(() => import('../Header'));
// // const Footer = lazy(() => import('../Footer'));
// const Mapper = lazy(() => import('../../pages/mapper/Mapper'));
// const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

// const TreeData = lazy(() => import('../../pages/mapper/TreeData'));
// const AddTree = lazy(() => import('../../pages/addtree/AddTree'));

// const About = lazy(() => import('../../pages/about/About'));
// const Terms = lazy(() => import('../../pages/terms/Terms'));
// const Privacy = lazy(() => import('../../pages/privacy/Privacy'));

import Header from '../Header';
// import Footer from '../Footer';
import NotFound from '../../pages/notFound/NotFound';
import TreeData from '../../pages/treedata/TreeData';
import AddTree from '../../pages/addtree/AddTree';
import Mapper from '../../pages/mapper/Mapper';

function Layout(props) {
  const functionName = 'Layout';
  console.info(functionName, 'props', props);
  return (
    <div className="Layout">
      <Header />
      <Switch>
        <Route path="/" exact component={Mapper} />
        <Route path="/treedata" exact component={TreeData} />
        <Route path="/addtree" exact component={AddTree} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);
