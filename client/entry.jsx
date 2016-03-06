import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, replace } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import CoreLayout from 'layouts/CoreLayout';
import {
  IndexView,
  TransactionsView,
  GoalsView,
  ProfileView,
  KittensView,
  LoginView
} from 'views';

import reducers from 'redux/reducers';
import { requireAuthentication } from 'redux/utils';
import 'styles/sass/main.scss';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers);

const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CoreLayout}>
        <IndexRoute component={IndexView} />
        <Route path="transactions" component={TransactionsView} />
        <Route path="goals" component={GoalsView} />
        <Route path="profile" component={requireAuthentication(ProfileView)} />
        <Route path="kittens" component={KittensView} />
        <Route path="login" component={LoginView} />
      </Route>
    </Router>
  </Provider>,
  rootElement
);
