
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

import Home from './components/Home';

const Routes = (
  <Route path="/">
    <IndexRoute component={Home} />
  </Route>
);

export default Routes;