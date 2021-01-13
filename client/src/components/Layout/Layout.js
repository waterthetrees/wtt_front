import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
import NotFound from '../../pages/notFound/NotFound';
// const TreeData = lazy(() => import('../../pages/treedata/TreeData'));
// const AddTree = lazy(() => import('../../pages/addtree/AddTree'));
const Terms = lazy(() => import('../../pages/terms/Terms'));
const Privacy = lazy(() => import('../../pages/privacy/Privacy'));
// const NotFound = lazy(() => import('../../pages/notFound/NotFound'));
{ /* <Route path="/treedata" exact component={TreeData} />
        <Route path="/addtree" exact component={AddTree} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/privacy" exact component={Privacy} /> */ }
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
      width: '100%',
      height: '100%',
    }}
  >
    WaterTheTrees
  </div>
);
function Layout() {
  return (
    <div className="Layout">
      <Header />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Mapper} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/" exact component={Mapper} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(Layout);
