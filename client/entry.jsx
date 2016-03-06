import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import IndexPage from 'layouts/Index';
import TransactionsPage from 'layouts/Transactions';
import GoalsPage from 'layouts/Goals';
import ProfilePage from 'layouts/Profile';

import reducers from 'redux/reducers';
import 'styles/sass/main.scss';

let createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger()
)(createStore);
let store = createStoreWithMiddleware(reducers);

let history = syncHistoryWithStore(browserHistory, store);

let rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={IndexPage}/>
      <Route path="/transactions" component={TransactionsPage}/>
      <Route path="/goals" component={GoalsPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </Router>
  </Provider>,
  rootElement
);
