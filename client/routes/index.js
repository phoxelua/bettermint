import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import {
  IndexView,
  TransactionsView,
  GoalsView,
  ProfileView,
  KittensView,
  LoginView
} from 'views';
import { requireAuthentication } from 'utilities';


export default (store) => {
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={IndexView} />
      <Route path='transactions' component={TransactionsView} />
      <Route path='goals' component={GoalsView} />
      <Route path='profile' component={requireAuthentication(ProfileView)} />
      <Route path='kittens' component={KittensView} />
      <Route path='login' component={LoginView} />
    </Route>
  );
};
