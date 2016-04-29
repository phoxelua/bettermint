import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import {
  IndexView,
  TransactionsView,
  GoalsView,
  ProfileView,
  LoginView,
} from 'views';
import { requireAuthentication } from 'utilities/routes';


export default () => {
  return (
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={IndexView} />
      <Route path="transactions" component={requireAuthentication(TransactionsView)} />
      <Route path="goals" component={GoalsView} />
      <Route path="profile" component={requireAuthentication(ProfileView)} />
      <Route path="login" component={LoginView} />
    </Route>
  );
};
