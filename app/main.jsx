// Client side entry point

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

const Root = ({history}) => {
  return (
    <Router history={history}>
      {routes}
    </Router>
  )
};

render(<Root history={browserHistory} />, document.getElementById('app-content'));