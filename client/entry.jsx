import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import Root from 'containers/Root';
import makeRoutes from 'routes';
import reducers from 'reducers';
import 'styles/sass/main.scss';


const routingMiddleware = routerMiddleware(browserHistory);

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk,
    promise,
    createLogger(),
    routingMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducers);

const history = syncHistoryWithStore(browserHistory, store);

const routes = makeRoutes(store);

ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
