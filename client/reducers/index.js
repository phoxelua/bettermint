import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import kittens from './kittens';

const reducers = combineReducers({
  kittens,
  routing: routerReducer
});

export default reducers;
