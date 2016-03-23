import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from 'reducers/auth';
import data from 'reducers/data';
import kittens from 'reducers/kittens';

const reducers = combineReducers({
  auth,
  data,
  kittens,
  routing: routerReducer
});

export default reducers;
