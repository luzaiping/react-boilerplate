import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './component/nav';
import Loading from './component/common/loading';

const BASE_PATH = './component';
const ROUTE_CONFIG = [
  {
    path: '/',
    componentPath: `${BASE_PATH}/home`,
    exact: true
  },
  {
    path: '/about',
    componentPath: `${BASE_PATH}/about`
  },
  {
    path: '/contact',
    componentPath: `${BASE_PATH}/contact`
  },
  {
    path: '/article',
    componentPath: `${BASE_PATH}/article`,
  },
  {
    componentPath: `${BASE_PATH}/noMatch`,
  }
];

const getRouteItems = () => (
  ROUTE_CONFIG.map(({ path, componentPath, exact = false }) => {
    // const loadComponent = lazy(()=> import(/*webpackChunkName:${someName}"*/`${componentPath}`))
    const loadComponent = lazy(() => import(`${componentPath}`));
    return <Route exact={exact} path={path} component={loadComponent} key={path || '/noMatch'} />;
  })
);

const Router = () => (
  <BrowserRouter>
    <Nav />
    <Suspense fallback={<Loading />}>
      <Switch> { getRouteItems() } </Switch>
    </Suspense>
  </BrowserRouter>
);

export default React.memo(Router);
