'use strict';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import IndexPage from './pages/Index';
import TransactionsPage from './pages/Transactions';
import GoalsPage from './pages/Goals';
import ProfilePage from './pages/Profile';

import reducers from './reducers';
import './styles/sass/main.scss';

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
      <Route path="/" component={IndexPage}/>
      <Route path="/transactions" component={TransactionsPage}/>
      <Route path="/goals" component={GoalsPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </Router>
  </Provider>,
  rootElement
);
