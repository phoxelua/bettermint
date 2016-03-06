import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import kittens from 'redux/reducers/kittens';

const reducers = combineReducers({
  kittens,
  routing: routerReducer
});

export default reducers;
