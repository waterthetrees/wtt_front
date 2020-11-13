import React, { lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';

const TreeData = lazy(() => import('../../pages/treedata/TreeData'));
const AddTree = lazy(() => import('../../pages/addtree/AddTree'));
const Terms = lazy(() => import('../../pages/terms/Terms'));
const Privacy = lazy(() => import('../../pages/privacy/Privacy'));
const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <Switch>
        <Route path="/" exact component={Mapper} />
        <Route path="/treedata" exact component={TreeData} />
        <Route path="/addtree" exact component={AddTree} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/privacy" exact component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);
