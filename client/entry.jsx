'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import IndexPage from './pages/Index';
import TransactionsPage from './pages/Transactions';
import GoalsPage from './pages/Goals';
import ProfilePage from './pages/Profile';
import jss from 'jss';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPx from 'jss-px';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import './styles/sass/main.scss';

jss.use(jssVendorPrefixer());
jss.use(jssPx());
jss.use(jssNested());
jss.use(jssCamelCase());

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers);


const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={IndexPage}/>
      <Route path="/transactions" component={TransactionsPage}/>
      <Route path="/goals" component={GoalsPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
