import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';

import Home from 'routes/Home';
import Login from 'routes/Login';
import Goals from 'routes/Goals';
import Profile from 'routes/Profile';
import Transactions from 'routes/Transactions';

import { requireAuthentication } from 'utilities/routes';

export default () => {
  return (
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Home} />
      <Route path="transactions" component={requireAuthentication(Transactions)} />
      <Route path="goals" component={requireAuthentication(Goals)} />
      <Route path="profile" component={requireAuthentication(Profile)} />
      <Route path="login" component={Login} />
    </Route>
  );
};
