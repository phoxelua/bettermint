import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from 'redux/reducers/auth';
import data from 'redux/reducers/data';
import kittens from 'redux/reducers/kittens';

const reducers = combineReducers({
  auth,
  data,
  kittens,
  routing: routerReducer
});

export default reducers;
