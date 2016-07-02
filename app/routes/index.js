import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from '../layouts/CoreLayout';

import Home from './Home';
import Login from './Login';
import {
  GoalsView,
  GoalsListView,
  GoalView,
} from './Goals';
import Profile from './Profile';
import Transactions from './Transactions';

import { requireAuthentication } from '../utilities/routes';

export default () => {
  return (
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Home} />
      <Route path="transactions" component={requireAuthentication(Transactions)} />
      <Route path="goals" component={requireAuthentication(GoalsView)}>
        <IndexRoute component={GoalsListView} />
        <Route path=":id" component={GoalView} />
      </Route>
      <Route path="profile" component={requireAuthentication(Profile)} />
      <Route path="login" component={Login} />
    </Route>
  );
};
